import React, { useEffect, useRef, useState, type FormEvent } from 'react';

interface Message {
	id: number;
	role: 'user' | 'assistant' | 'system';
	content: string;
}

const WORKER_URL =
	'https://llm-chat-app-template.davideperrotta1991.workers.dev/api/chat';

export function AiChat() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const text = input.trim();
		if (!text || loading) return;

		setError(null);
		setInput('');

		setMessages(prev => [
			...prev,
			{
				id: Date.now(),
				role: 'user',
				content: text,
			},
		]);

		setLoading(true);

		try {
			const response = await fetch(WORKER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt: text }),
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const data = await response.json();
			const answerText: string =
				data && typeof data.response === 'string'
					? data.response
					: 'Sorry, Davide is offline right now. Please try again later!';

			setMessages(prev => [
				...prev,
				{
					id: Date.now() + 1,
					role: 'assistant',
					content: answerText,
				},
			]);
		} catch (error) {
			console.error('Error while calling the AI:', error);
			setError(
				'Sorry, Davide is offline right now. Please try again later!',
			);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!messagesEndRef.current) return;
		if (messages.length === 0 && !loading && !error) return;

		const frameId = window.requestAnimationFrame(() => {
			messagesEndRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
		});

		return () => {
			window.cancelAnimationFrame(frameId);
		};
	}, [messages, loading, error]);

	return (
		<div className="ai-chat">
			<div className="ai-chat__messages" ref={messagesContainerRef}>
				{messages.length === 0 && (
					<p className="ai-chat__placeholder">
						Start the conversation by asking about Davide Perrotta.
					</p>
				)}

				{messages.map(message => (
					<div
						key={message.id}
						className={`ai-chat__message ai-chat__message--${message.role}`}
					>
						<span className="ai-chat__message-role">
							{message.role === 'user' ? 'You' : 'Davide AI'}
						</span>
						<p className="ai-chat__message-text">{message.content}</p>
					</div>
				))}

				{loading && (
					<div className="ai-chat__message ai-chat__message--assistant ai-chat__message--pending">
						<span className="ai-chat__message-role">Davide AI</span>
						<p className="ai-chat__message-text">Writing a reply…</p>
					</div>
				)}

				{error && <p className="ai-chat__error">{error}</p>}

				<div ref={messagesEndRef} aria-hidden="true" />
			</div>

			<form className="ai-chat__form" onSubmit={handleSubmit}>
				<input
					type="text"
					value={input}
					placeholder="Type your question…"
					onChange={event => setInput(event.target.value)}
					className="ai-chat__input"
					aria-label="Question for Davide AI"
				/>
				<button
					type="submit"
					disabled={loading || !input.trim()}
					className="ai-chat__button"
				>
					Send
				</button>
			</form>
		</div>
	);
}
