import React, { useState, useRef, useEffect, useCallback } from 'react';
import pkg from 'peerjs';
const { Peer } = pkg;

const VideoCallClient = () => {
	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [peerId, setPeerId] = useState('');
	const [remotePeerId, setRemotePeerId] = useState('');
	const [error, setError] = useState('');
	const [connectionState, setConnectionState] = useState('disconnected');

	const localVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);
	const peerRef = useRef(null);
	const localStreamRef = useRef(null);
	const remoteStreamRef = useRef(null);
	const currentCallRef = useRef(null);

	const startLocalStream = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
			
			localStreamRef.current = stream;
			setLocalStream(stream);
			
			if (localVideoRef.current) {
				localVideoRef.current.srcObject = stream;
			}
			
			// Initialize PeerJS after getting media
			if (!peerRef.current) {
				const peer = new Peer();
				
				peer.on('open', (id) => {
					console.log('My peer ID is: ' + id);
					setPeerId(id);
				});

				peer.on('call', (call) => {
					console.log('Receiving call from:', call.peer);
					call.answer(localStreamRef.current);
					
					call.on('stream', (remoteStream) => {
						console.log('Received remote stream');
						remoteStreamRef.current = remoteStream;
						setRemoteStream(remoteStream);
						
						if (remoteVideoRef.current) {
							remoteVideoRef.current.srcObject = remoteStream;
						}
						setIsConnected(true);
						setConnectionState('connected');
					});

					call.on('close', () => {
						console.log('Call ended');
						setIsConnected(false);
						setConnectionState('disconnected');
						if (remoteVideoRef.current) {
							remoteVideoRef.current.srcObject = null;
						}
						setRemoteStream(null);
						remoteStreamRef.current = null;
					});

					currentCallRef.current = call;
				});

				peer.on('error', (err) => {
					console.error('PeerJS error:', err);
					setError('Connection error: ' + err.message);
				});

				peerRef.current = peer;
			}
			
			setError('');
		} catch (err) {
			console.error('Error accessing media devices:', err);
			setError('Failed to access camera and microphone. Please check permissions.');
		}
	};

	const callPeer = () => {
		if (!remotePeerId) {
			setError('Please enter a remote peer ID.');
			return;
		}

		if (!peerRef.current || !localStreamRef.current) {
			setError('Please start your camera first.');
			return;
		}

		try {
			const call = peerRef.current.call(remotePeerId, localStreamRef.current);
			
			if (!call) {
				setError('Could not initiate call. Peer may not be available.');
				return;
			}

			call.on('stream', (remoteStream) => {
				console.log('Received remote stream');
				remoteStreamRef.current = remoteStream;
				setRemoteStream(remoteStream);
				
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = remoteStream;
				}
				setIsConnected(true);
				setConnectionState('connected');
			});

			call.on('close', () => {
				console.log('Call ended');
				setIsConnected(false);
				setConnectionState('disconnected');
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = null;
				}
				setRemoteStream(null);
				remoteStreamRef.current = null;
			});

			call.on('error', (err) => {
				console.error('Call error:', err);
				setError('Call error: ' + err.message);
			});

			currentCallRef.current = call;
			setConnectionState('connecting');
			setError('');
		} catch (err) {
			console.error('Error calling peer:', err);
			setError('Failed to call peer. Please check the peer ID.');
		}
	};

	const toggleAudio = () => {
		if (localStreamRef.current) {
			const audioTrack = localStreamRef.current.getAudioTracks()[0];
			if (audioTrack) {
				audioTrack.enabled = !audioTrack.enabled;
				setIsAudioEnabled(audioTrack.enabled);
			}
		}
	};

	const toggleVideo = () => {
		if (localStreamRef.current) {
			const videoTrack = localStreamRef.current.getVideoTracks()[0];
			if (videoTrack) {
				videoTrack.enabled = !videoTrack.enabled;
				setIsVideoEnabled(videoTrack.enabled);
			}
		}
	};

	const endCall = () => {
		if (currentCallRef.current) {
			currentCallRef.current.close();
			currentCallRef.current = null;
		}

		if (peerRef.current) {
			peerRef.current.destroy();
			peerRef.current = null;
		}

		if (localStreamRef.current) {
			localStreamRef.current.getTracks().forEach(track => track.stop());
			localStreamRef.current = null;
		}

		if (remoteStreamRef.current) {
			remoteStreamRef.current.getTracks().forEach(track => track.stop());
			remoteStreamRef.current = null;
		}

		setLocalStream(null);
		setRemoteStream(null);
		setIsConnected(false);
		setPeerId('');
		setRemotePeerId('');
		setConnectionState('disconnected');

		if (localVideoRef.current) {
			localVideoRef.current.srcObject = null;
		}
		if (remoteVideoRef.current) {
			remoteVideoRef.current.srcObject = null;
		}
	};

	useEffect(() => {
		return () => {
			endCall();
		};
	}, []);

	const copyPeerId = () => {
		if (peerId) {
			navigator.clipboard.writeText(peerId);
			setError('Peer ID copied to clipboard!');
			setTimeout(() => setError(''), 2000);
		}
	};

	return (
		<div className="video-call">
			<div className="video-container">
				<div className="video-grid">
					<div className="video-item">
						<video
							ref={localVideoRef}
							autoPlay
							muted
							playsInline
							className="video-element local-video"
						/>
						<div className="video-label">You</div>
						{!isVideoEnabled && (
							<div className="video-placeholder">
								<div className="avatar-icon">👤</div>
								<span>Camera Off</span>
							</div>
						)}
					</div>
					
					<div className="video-item">
						<video
							ref={remoteVideoRef}
							autoPlay
							playsInline
							className="video-element remote-video"
						/>
						<div className="video-label">Remote User</div>
						{!remoteStream && (
							<div className="video-placeholder">
								<div className="avatar-icon">👥</div>
								<span>Waiting for connection...</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="controls">
				<div className="connection-controls">
					{!localStream ? (
						<button onClick={startLocalStream} className="btn btn-primary">
							📹 Start Camera
						</button>
					) : (
						<>
							{peerId && (
								<div className="peer-info">
									<div className="your-id">
										<span>Your ID: </span>
										<span className="peer-id">{peerId}</span>
										<button onClick={copyPeerId} className="btn btn-copy">
											📋 Copy
										</button>
									</div>
								</div>
							)}
							
							<div className="call-controls">
								<input
									type="text"
									value={remotePeerId}
									onChange={(e) => setRemotePeerId(e.target.value)}
									placeholder="Enter remote peer ID"
									className="peer-input"
								/>
								<button onClick={callPeer} className="btn btn-secondary" disabled={!remotePeerId}>
									📞 Call
								</button>
							</div>
						</>
					)}
				</div>

				{localStream && (
					<div className="media-controls">
						<button
							onClick={toggleAudio}
							className={`btn ${isAudioEnabled ? 'btn-active' : 'btn-inactive'}`}
						>
							{isAudioEnabled ? '🎤' : '🔇'} Audio
						</button>
						<button
							onClick={toggleVideo}
							className={`btn ${isVideoEnabled ? 'btn-active' : 'btn-inactive'}`}
						>
							{isVideoEnabled ? '📹' : '📵'} Video
						</button>
						<button onClick={endCall} className="btn btn-danger">
							📞 End Call
						</button>
					</div>
				)}

				{error && <div className="error-message">{error}</div>}
				
				{connectionState !== 'disconnected' && (
					<div className="connection-status">
						Status: <span className={`status ${connectionState}`}>{connectionState}</span>
					</div>
				)}
			</div>

			<style jsx>{`
				.video-call {
					background: rgba(15, 23, 42, 0.85);
					border-radius: 1.25rem;
					padding: 1.5rem;
					border: 1px solid rgba(148, 163, 184, 0.3);
					box-shadow: 0 18px 40px rgba(15, 23, 42, 0.55);
				}

				.video-container {
					margin-bottom: 1.5rem;
				}

				.video-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1rem;
					min-height: 300px;
				}

				.video-item {
					position: relative;
					background: #1e293b;
					border-radius: 0.75rem;
					overflow: hidden;
					aspect-ratio: 16/9;
				}

				.video-element {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.video-label {
					position: absolute;
					bottom: 0.5rem;
					left: 0.5rem;
					background: rgba(0, 0, 0, 0.7);
					color: white;
					padding: 0.25rem 0.5rem;
					border-radius: 0.25rem;
					font-size: 0.875rem;
				}

				.video-placeholder {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					text-align: center;
					color: #94a3b8;
				}

				.avatar-icon {
					font-size: 3rem;
					margin-bottom: 0.5rem;
				}

				.controls {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.connection-controls {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.peer-info {
					text-align: center;
					color: #94a3b8;
					font-size: 0.875rem;
				}

				.your-id {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					flex-wrap: wrap;
				}

				.peer-id {
					background: rgba(59, 130, 246, 0.2);
					padding: 0.25rem 0.5rem;
					border-radius: 0.25rem;
					font-family: monospace;
					color: #3b82f6;
				}

				.call-controls {
					display: flex;
					gap: 0.5rem;
					flex-wrap: wrap;
				}

				.peer-input {
					flex: 1;
					min-width: 200px;
					padding: 0.5rem;
					border: 1px solid rgba(148, 163, 184, 0.3);
					border-radius: 0.375rem;
					background: #1e293b;
					color: white;
					font-size: 0.875rem;
				}

				.peer-input:focus {
					outline: none;
					border-color: #3b82f6;
					box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
				}

				.media-controls {
					display: flex;
					justify-content: center;
					gap: 0.5rem;
					flex-wrap: wrap;
				}

				.btn {
					padding: 0.5rem 1rem;
					border: none;
					border-radius: 0.375rem;
					font-size: 0.875rem;
					font-weight: 500;
					cursor: pointer;
					transition: all 0.2s;
					display: flex;
					align-items: center;
					gap: 0.25rem;
				}

				.btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				.btn-primary {
					background: #3b82f6;
					color: white;
				}

				.btn-primary:hover:not(:disabled) {
					background: #2563eb;
				}

				.btn-secondary {
					background: #64748b;
					color: white;
				}

				.btn-secondary:hover:not(:disabled) {
					background: #475569;
				}

				.btn-copy {
					background: #059669;
					color: white;
					padding: 0.25rem 0.5rem;
					font-size: 0.75rem;
				}

				.btn-copy:hover {
					background: #047857;
				}

				.btn-active {
					background: #10b981;
					color: white;
				}

				.btn-active:hover {
					background: #059669;
				}

				.btn-inactive {
					background: #ef4444;
					color: white;
				}

				.btn-inactive:hover {
					background: #dc2626;
				}

				.btn-danger {
					background: #dc2626;
					color: white;
				}

				.btn-danger:hover {
					background: #b91c1c;
				}

				.error-message {
					background: rgba(239, 68, 68, 0.2);
					border: 1px solid rgba(239, 68, 68, 0.3);
					color: #fca5a5;
					padding: 0.75rem;
					border-radius: 0.375rem;
					font-size: 0.875rem;
				}

				.connection-status {
					text-align: center;
					color: #94a3b8;
					font-size: 0.875rem;
				}

				.status {
					font-weight: 600;
				}

				.status.connected {
					color: #10b981;
				}

				.status.connecting {
					color: #f59e0b;
				}

				.status.disconnected {
					color: #ef4444;
				}

				.status.failed {
					color: #ef4444;
				}

				@media (max-width: 768px) {
					.video-grid {
						grid-template-columns: 1fr;
					}

					.call-controls {
						flex-direction: column;
					}

					.media-controls {
						flex-direction: column;
					}

					.btn {
						justify-content: center;
					}

					.your-id {
						flex-direction: column;
						gap: 0.25rem;
					}
				}
			`}</style>
		</div>
	);
};

export default VideoCallClient;
