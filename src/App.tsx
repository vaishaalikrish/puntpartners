import React, { useState, useEffect } from 'react';
import FontSelector from './FontSelector';
import './App.css';
import fontsData from './fonts.json';

interface FontsData {
  [key: string]: {
    [variant: string]: string;
  };
}

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('Roboto');
  const [fontWeight, setFontWeight] = useState<string>('400');
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const fonts: FontsData = fontsData;

  useEffect(() => {
    const savedText = localStorage.getItem('text') || '';
    const savedFontFamily = localStorage.getItem('fontFamily') || 'Roboto';
    const savedFontWeight = localStorage.getItem('fontWeight') || '400';
    const savedIsItalic = JSON.parse(localStorage.getItem('isItalic') || 'false');

    setText(savedText);
    setFontFamily(savedFontFamily);
    setFontWeight(savedFontWeight);
    setIsItalic(savedIsItalic);
  }, []);

  useEffect(() => {
    localStorage.setItem('text', text);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontWeight', fontWeight);
    localStorage.setItem('isItalic', JSON.stringify(isItalic));
  }, [text, fontFamily, fontWeight, isItalic]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}${isItalic ? 'italic' : ''}&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontFamily, fontWeight, isItalic]);

  const handleFontChange = (newFontFamily: string) => {
    const currentVariant = `${fontWeight}${isItalic ?  'italic' :''}`;
    const newVariants = Object.keys(fonts[newFontFamily]);

    let newFontWeight = fontWeight;
    let newIsItalic = isItalic;

    if (!newVariants.includes(currentVariant)) {
      if (isItalic) {
        const closestItalic = newVariants.find((v) => v.endsWith('italic'));
        if (closestItalic) {
          newFontWeight = closestItalic.replace('italic', '');
        } else {
          newFontWeight = newVariants[0].replace('italic', '');
          newIsItalic = false;
        }
      } else {
        const closestWeight = newVariants.find((v) => v === fontWeight) || newVariants[0];
        newFontWeight = closestWeight.replace('italic', '');
      }
    }

    setFontFamily(newFontFamily);
    setFontWeight(newFontWeight);
    setIsItalic(newIsItalic);
  };
  const handleSave = () => {
    localStorage.setItem('text', text);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontWeight', fontWeight);
    localStorage.setItem('isItalic', JSON.stringify(isItalic));
  };

  // Reset state and clear localStorage
  const handleReset = () => {
    setText('');
    setFontFamily('Roboto');
    setFontWeight('400');
    setIsItalic(false);
    localStorage.removeItem('text');
    localStorage.removeItem('fontFamily');
    localStorage.removeItem('fontWeight');
    localStorage.removeItem('isItalic');
  };

  

  return (
    <div className="App">
      <h1>Text Editor</h1>
      <FontSelector
        fontsData={fonts}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        isItalic={isItalic}
        setFontFamily={handleFontChange}
        setFontWeight={setFontWeight}
        setIsItalic={setIsItalic}
      />
      <textarea
        style={{ fontFamily, fontWeight, fontStyle: isItalic ? 'italic' : 'normal' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;