function SanitizeInstrument(instrument, category) {
  console.log(instrument);
  switch (instrument) {
    case 'Solo (drumset)':
      return 'Drumset';
    case 'Solo (multiperc)':
      return 'Multi Perc';
    case 'Solo (steeldrum)':
      return 'Steel Drum';
    case 'Solo (djembe)':
      return 'Djembe';
    case 'Solo (mallets)':
      return 'Keyboard';
    case 'Solo (marimba)':
      return 'Keyboard';
    case 'Solo (mallet)':
      return 'Keyboard';
    case 'Solo (Marimba)':
      return 'Keyboard';
    case 'Solo (multi-tenor)':
      return 'Tenors';
    case 'Solo (snare)':
      return 'Snare';
    case 'Solo (timpani)':
      return 'Timpani';
    case 'Solo (vibes)':
      return 'Keyboard';
    case 'Solo (marmiba)':
      return 'Keyboard';
    default:
      if (category === 'Solos: Marimba & Xylophone' || category === 'Solos: Vibraphone') {
        return 'Keyboard';
      }
      return instrument;
  }
}

export default SanitizeInstrument;
