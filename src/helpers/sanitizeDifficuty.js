function SanitzeDifficulty(difficulty) {
	switch (difficulty) {
	case 'Easy':
		return 'Easy';
	case 'Medium':
		return 'Medium';
	case 'Advanced':
		return 'Advanced';
	case 'Med-Easy':
		return 'Medium Easy';
	case 'Med-Advanced':
		return 'Medium Advanced';
	default:
		return `Various: ${difficulty}`;
	}
}

export default SanitzeDifficulty;