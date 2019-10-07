
class Sound {

	constructor(context) {
		this.context = context;
	}

	init() {
		this.oscillator = this.context.createOscillator();
		this.gainNode = this.context.createGain();

		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.context.destination);
		this.oscillator.type = 'sine';
	}

	play(value, time) {
		this.init();

		this.oscillator.frequency.value = value;
		this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

		this.oscillator.start(time);
		this.stop(time);

	}

	stop(time) {
		this.oscillator.stop(time + 1);
	}
}

function start() {
	const container = document.getElementById("container");
	container.remove();

	const canvas = document.getElementById("canvas-board");
	const aqual_label = document.getElementById("aqua-label");

	const canvas_context = canvas.getContext("2d");
	const audio_context = new (window.AudioContext || window.webkitAudioContext)();

	canvas.width = window.innerWidth - 100;
	canvas.height = window.innerHeight - 100;

	const width = canvas.width;
	const height = canvas.height;

	let frame_index = 0;

	// atualiza o canvas e o som a cada 1s
	setInterval(OnGUI, 1000);

	function OnGUI() {
		// limpa o canvas
		ClearCanvas();

		// atualiza nossa label =]
		const frame_string = "000" + frame_index++;
		aqual_label.textContent = `aqua.flv - slide ${frame_string.substr(frame_string.length - 4)}`;

		const blue = {
			width: Math.random() * width,
			height: Math.random() * height,
		}

		blue.x = Math.abs((Math.random() * width) - blue.width);
		blue.y = Math.abs((Math.random() * height) - blue.height);

		// primeiro o retangulo azul
		canvas_context.fillStyle = "#00f";
		canvas_context.fillRect(blue.x, blue.y, blue.width, blue.height);

		const red = {
			width: Math.random() * width,
			height: Math.random() * height,
		}

		red.x = Math.abs((Math.random() * width) - red.width);
		red.y = Math.abs((Math.random() * height) - red.height);

		// em seguida o retangulo vermelho
		// pois o retangulo vermelho sempre sobrepoe o azul
		canvas_context.fillStyle = "#f00";
		canvas_context.fillRect(red.x, red.y, red.width, red.height);

		// instancia e reproduz uma nota
		const note = new Sound(audio_context);
		const now = audio_context.currentTime;

		note.play(1000 - (Math.random() * 900), now);
	}

	function ClearCanvas() {
		// preenche todo o canvas com um rect branco
		canvas_context.fillStyle = "#ffffff";
		canvas_context.fillRect(0, 0, width, height);
	}
}