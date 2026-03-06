import React, { useState, type FormEvent } from 'react';

interface Message {
	id: number;
	role: 'user' | 'assistant' | 'system';
	content: string;
}

const WORKER_URL =
	'https://llm-chat-app-template.davideperrotta1991.workers.dev/';

export function AiChat() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
				throw new Error(`Errore Server: ${response.status}`);
			}

			const data = await response.json();
			const answerText: string =
				data && typeof data.response === 'string'
					? data.response
					: 'Scusa, Davide è offline al momento. Riprova più tardi!';

			setMessages(prev => [
				...prev,
				{
					id: Date.now() + 1,
					role: 'assistant',
					content: answerText,
				},
			]);
		} catch (error) {
			console.error('Errore durante la chiamata all\'AI:', error);
			setError(
				'Scusa, Davide è offline al momento. Riprova più tardi!',
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="ai-chat">
			<div className="ai-chat__messages">
				{messages.length === 0 && (
					<p className="ai-chat__placeholder">
						Inizia la conversazione chiedendo qualsiasi cosa su sviluppo web,
						software o il tuo progetto.
					</p>
				)}

				{messages.map(message => (
					<div
						key={message.id}
						className={`ai-chat__message ai-chat__message--${message.role}`}
					>
						<span className="ai-chat__message-role">
							{message.role === 'user' ? 'Tu' : 'Davide AI'}
						</span>
						<p className="ai-chat__message-text">{message.content}</p>
					</div>
				))}

				{loading && (
					<div className="ai-chat__message ai-chat__message--assistant ai-chat__message--pending">
						<span className="ai-chat__message-role">Davide AI</span>
						<p className="ai-chat__message-text">Sto scrivendo una risposta…</p>
					</div>
				)}

				{error && <p className="ai-chat__error">{error}</p>}
			</div>

			<form className="ai-chat__form" onSubmit={handleSubmit}>
				<input
					type="text"
					value={input}
					placeholder="Scrivi la tua domanda…"
					onChange={event => setInput(event.target.value)}
					className="ai-chat__input"
					aria-label="Domanda per Davide AI"
				/>
				<button
					type="submit"
					disabled={loading || !input.trim()}
					className="ai-chat__button"
				>
					Invia
				</button>
			</form>
		</div>
	);
}
