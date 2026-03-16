import React, { useState, useRef, useEffect, useCallback } from 'react';
import pkg from 'peerjs';
const { Peer } = pkg;

const VideoCallClient = () => {
	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [roomId, setRoomId] = useState('');
	const [joinRoomId, setJoinRoomId] = useState('');
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
			console.log('Requesting media access...');
			
			// Check if media devices are available
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error('getUserMedia is not supported in this browser');
			}

			// Try with different constraints
			let stream;
			try {
				// First try with both video and audio
				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						width: { ideal: 1280 },
						height: { ideal: 720 }
					},
					audio: true
				});
			} catch (videoErr) {
				console.warn('Failed with HD video, trying basic video:', videoErr);
				try {
					// Try with basic video
					stream = await navigator.mediaDevices.getUserMedia({
						video: true,
						audio: true
					});
				} catch (basicErr) {
					console.warn('Failed with video, trying audio only:', basicErr);
					try {
						// Try audio only
						stream = await navigator.mediaDevices.getUserMedia({
							audio: true,
							video: false
						});
					} catch (audioErr) {
						throw new Error('Could not access any media devices. Please check browser permissions.');
					}
				}
			}
			
			console.log('Media access granted, stream obtained:', stream);
			localStreamRef.current = stream;
			setLocalStream(stream);
			
			if (localVideoRef.current) {
				localVideoRef.current.srcObject = stream;
			}
			
			// Initialize PeerJS with room-based ID
			if (!peerRef.current) {
				console.log('Initializing PeerJS...');
				const peer = new Peer();
				
				peer.on('open', (id) => {
					console.log('PeerJS connected with ID:', id);
				});

				peer.on('call', (call) => {
					console.log('Receiving call in room:', call.metadata?.roomId || 'unknown');
					if (!localStreamRef.current) {
						console.error('No local stream to answer call');
						return;
					}
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
				console.log('PeerJS initialized successfully');
			}
			
			setError('');
			console.log('Camera and microphone started successfully');
		} catch (err) {
			console.error('Detailed error accessing media devices:', err);
			console.error('Error name:', err.name);
			console.error('Error message:', err.message);
			
			let errorMessage = 'Failed to access camera and microphone. ';
			
			if (err.name === 'NotAllowedError') {
				errorMessage += 'Permission denied. Please allow camera/microphone access in your browser settings and refresh the page.';
			} else if (err.name === 'NotFoundError') {
				errorMessage += 'No camera or microphone found. Please connect a device and try again.';
			} else if (err.name === 'NotReadableError') {
				errorMessage += 'Camera or microphone is already in use by another application.';
			} else if (err.name === 'OverconstrainedError') {
				errorMessage += 'Camera does not meet the required constraints. Try refreshing the page.';
			} else if (err.name === 'TypeError') {
				errorMessage += 'Media devices not supported in this browser or insecure context (need HTTPS).';
			} else {
				errorMessage += 'Error: ' + err.message;
			}
			
			setError(errorMessage);
		}
	};

	const createRoom = () => {
		if (!localStreamRef.current) {
			setError('Please start your camera first.');
			return;
		}

		const newRoomId = Math.random().toString(36).substring(2, 8);
		setRoomId(newRoomId);
		
		console.log('Creating room:', newRoomId);
		
		// Create a peer with room ID as the identifier
		const roomPeerId = `room-${newRoomId}`;
		console.log('Room peer ID:', roomPeerId);
		
		// Destroy existing peer if any
		if (peerRef.current) {
			peerRef.current.destroy();
		}
		
		const peer = new Peer(roomPeerId);
		
		peer.on('open', (id) => {
			console.log('Room created successfully with ID:', newRoomId);
			console.log('PeerJS room peer ID:', id);
			setError('');
		});

		peer.on('call', (call) => {
			console.log('Someone joining room:', newRoomId, 'from peer:', call.peer);
			if (!localStreamRef.current) {
				console.error('No local stream to answer call');
				return;
			}
			call.answer(localStreamRef.current);
			
			call.on('stream', (remoteStream) => {
				console.log('Received remote stream in room:', newRoomId);
				remoteStreamRef.current = remoteStream;
				setRemoteStream(remoteStream);
				
				if (remoteVideoRef.current) {
					remoteVideoRef.current.srcObject = remoteStream;
				}
				setIsConnected(true);
				setConnectionState('connected');
			});

			call.on('close', () => {
				console.log('Call ended in room:', newRoomId);
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
			console.error('Room peer error:', err);
			console.error('Error type:', err.type);
			console.error('Error message:', err.message);
			
			if (err.type === 'unavailable-id') {
				setError('Room ID "' + newRoomId + '" is already taken. Creating a new room...');
				// Try again with a new room ID
				setTimeout(() => createRoom(), 1000);
			} else {
				setError('Room creation error: ' + err.message);
			}
		});

		peerRef.current = peer;
	};

	const joinRoom = () => {
		if (!localStreamRef.current) {
			setError('Please start your camera first.');
			return;
		}

		if (!joinRoomId) {
			setError('Please enter a room ID.');
			return;
		}

		const roomPeerId = `room-${joinRoomId}`;
		console.log('Attempting to join room:', joinRoomId);
		console.log('Target peer ID:', roomPeerId);
		
		// Make sure we have a peer connection
		if (!peerRef.current) {
			console.log('No peer connection, creating new one...');
			peerRef.current = new Peer();
			
			peerRef.current.on('open', (id) => {
				console.log('Joiner peer connected with ID:', id);
				// Now try to join the room
				attemptRoomJoin();
			});
			
			peerRef.current.on('error', (err) => {
				console.error('Joiner peer error:', err);
				setError('Connection error: ' + err.message);
			});
		} else {
			attemptRoomJoin();
		}
		
		function attemptRoomJoin() {
			try {
				console.log('Calling room peer:', roomPeerId);
				const call = peerRef.current.call(roomPeerId, localStreamRef.current, { metadata: { roomId: joinRoomId } });
				
				if (!call) {
					console.error('Failed to initiate call to room:', roomPeerId);
					setError('Could not join room. Room may not exist or is full.');
					return;
				}

				console.log('Call initiated to room:', joinRoomId);
				setConnectionState('connecting');

				call.on('stream', (remoteStream) => {
					console.log('Connected to room:', joinRoomId);
					remoteStreamRef.current = remoteStream;
					setRemoteStream(remoteStream);
					
					if (remoteVideoRef.current) {
						remoteVideoRef.current.srcObject = remoteStream;
					}
					setIsConnected(true);
					setConnectionState('connected');
					setError('');
				});

				call.on('close', () => {
					console.log('Left room:', joinRoomId);
					setIsConnected(false);
					setConnectionState('disconnected');
					if (remoteVideoRef.current) {
						remoteVideoRef.current.srcObject = null;
					}
					setRemoteStream(null);
					remoteStreamRef.current = null;
				});

				call.on('error', (err) => {
					console.error('Room call error:', err);
					console.error('Error type:', err.type);
					console.error('Error message:', err.message);
					
					if (err.type === 'peer-unavailable') {
						setError('Room "' + joinRoomId + '" does not exist. Please check the room ID.');
					} else {
						setError('Room connection error: ' + err.message);
					}
				});

				currentCallRef.current = call;
			} catch (err) {
				console.error('Error joining room:', err);
				setError('Failed to join room. Please check the room ID and try again.');
			}
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
		setRoomId('');
		setJoinRoomId('');
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

	const copyRoomId = () => {
		if (roomId) {
			navigator.clipboard.writeText(roomId);
			setError('Room ID copied to clipboard!');
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
							<div className="room-controls">
								<button onClick={createRoom} className="btn btn-secondary">
									🏠 Create Room
								</button>
								
								{roomId && (
									<div className="room-info">
										<span className="room-id">Room ID: {roomId}</span>
										<button onClick={copyRoomId} className="btn btn-copy">
											📋 Copy
										</button>
									</div>
								)}
								
								<div className="join-controls">
									<input
										type="text"
										value={joinRoomId}
										onChange={(e) => setJoinRoomId(e.target.value)}
										placeholder="Enter room ID to join"
										className="room-input"
									/>
									<button onClick={joinRoom} className="btn btn-secondary" disabled={!joinRoomId}>
										� Join Room
									</button>
								</div>
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

				.room-controls {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.room-info {
					text-align: center;
					color: #94a3b8;
					font-size: 0.875rem;
				}

				.room-id {
					background: rgba(59, 130, 246, 0.2);
					padding: 0.25rem 0.5rem;
					border-radius: 0.25rem;
					font-family: monospace;
					color: #3b82f6;
				}

				.join-controls {
					display: flex;
					gap: 0.5rem;
					flex-wrap: wrap;
				}

				.room-input {
					flex: 1;
					min-width: 200px;
					padding: 0.5rem;
					border: 1px solid rgba(148, 163, 184, 0.3);
					border-radius: 0.375rem;
					background: #1e293b;
					color: white;
					font-size: 0.875rem;
				}

				.room-input:focus {
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

					.join-controls {
						flex-direction: column;
					}

					.media-controls {
						flex-direction: column;
					}

					.btn {
						justify-content: center;
					}
				}
			`}</style>
		</div>
	);
};

export default VideoCallClient;
