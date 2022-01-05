function SanitzeDifficulty(difficulty) {
	switch (difficulty) {
	case 'Easy':
		return 'Easy';
	case 'Medium':
		return 'Medium';
	case 'Advanced':
		return 'Advanced';
	case 'Med-Easy':
		return 'Med. Easy';
	case 'Med-Advanced':
		return 'Med. Advanced';
	default:
		return 'Various';
	}
}

export default SanitzeDifficulty;