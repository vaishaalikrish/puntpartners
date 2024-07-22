import React, { useState, useEffect } from 'react';
import { GoogleFont } from './GoogleFont';

interface TextEditorProps {
  // No props needed, as we're managing state internally
}

const TextEditor: React.FC<TextEditorProps> = () => {
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('Open Sans');
  const [fontWeight, setFontWeight] = useState('400');
  const [italic, setItalic] = useState(false);
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([]);
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null);

  useEffect(() => {
    fetch('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap')
     .then(response => response.json())
     .then((data: { items: { family: string; variants: string[] }[] }) => {
        const fonts = data.items.map((item: { family: string; variants: string[] }) => ({
          family: item.family,
          variants: item.variants,
        }));
        setGoogleFonts(fonts);
        setSelectedFont(fonts.find((font: GoogleFont) => font.family === fontFamily) || null);
      });
  }, []);

  useEffect(() => {
    const savedText = localStorage.getItem('text');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedFontWeight = localStorage.getItem('fontWeight');
    const savedItalic = localStorage.getItem('italic');

    if (savedText) setText(savedText);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedFontWeight) setFontWeight(savedFontWeight);
    if (savedItalic) setItalic(savedItalic === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('text', text);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontWeight', fontWeight);
    localStorage.setItem('italic', italic.toString());
  }, [text, fontFamily, fontWeight, italic]);

  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontFamily = event.target.value;
    setFontFamily(newFontFamily);
    const newFont = googleFonts.find((font: GoogleFont) => font.family === newFontFamily);
    setSelectedFont(newFont || null);
  };

  const handleFontWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontWeight = event.target.value;
    setFontWeight(newFontWeight);
  };

  const handleItalicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItalic(event.target.checked);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const handleReset = () => {
    console.log('Reset button clicked!');
    localStorage.removeItem('text');
    localStorage.removeItem('fontFamily');
    localStorage.removeItem('fontWeight');
    localStorage.removeItem('italic');
    setText('');
    setFontFamily('Open Sans');
    setFontWeight('400');
    setItalic(false);
    console.log('State updated:', text, fontFamily, fontWeight, italic);
  };
  
  const storedData = [
    { label: 'Text', value: localStorage.getItem('text') },
    { label: 'Font Family', value: localStorage.getItem('fontFamily') },
    { label: 'Font Weight', value: localStorage.getItem('fontWeight') },
    { label: 'Italic', value: localStorage.getItem('italic') },
  ];

  return (
    <div>
      <select value={fontFamily} onChange={handleFontFamilyChange}>
        {googleFonts.map((font: GoogleFont) => (
          <option key={font.family} value={font.family}>
            {font.family}
          </option>
        ))}
      </select>
      <select value={fontWeight} onChange={handleFontWeightChange}>
        {selectedFont?.variants.map((variant: string) => (
          <option key={variant} value={variant}>
            {variant}
          </option>
        ))}
      </select>
      <input
        type="checkbox"
        checked={italic}
        onChange={handleItalicChange}
        disabled={!selectedFont?.variants.includes(`${fontWeight}i`)}
      />
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={handleReset}>Reset</button>
      <h2>Stored Data</h2>
      <ul>
        {storedData.map((item, index) => (
          <li key={index}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextEditor;
// import React from 'react';

// interface TextEditorProps {
//   text: string;
//   setText: (text: string) => void;
//   fontFamily: string;
//   fontWeight: number;
//   italic: boolean;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ text, setText, fontFamily, fontWeight, italic }) => {
//   return (
//     <div className="text-editor" style={{ fontFamily, fontWeight, fontStyle: italic ? 'italic' : 'normal' }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         style={{ width: '100%', height: '300px', fontFamily, fontWeight, fontStyle: italic ? 'italic' : 'normal' }}
//       />
//     </div>
//   );
// };

// export default TextEditor;