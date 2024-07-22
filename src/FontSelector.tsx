import React ,{useState} from 'react';

interface FontSelectorProps {
  fontsData: { [key: string]: { [variant: string]: string } };
  fontFamily: string;
  fontWeight: string;
  isItalic: boolean;
  setFontFamily: (fontFamily: string) => void;
  setFontWeight: (fontWeight: string) => void;
  setIsItalic: (isItalic: boolean) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  fontsData,
  fontFamily,
  fontWeight,
  isItalic,
  setFontFamily,
  setFontWeight,
  setIsItalic
}) => {
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value);
  };

  const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(e.target.value);
  };

  const handleItalicToggle = () => {
    setIsItalic(!isItalic);
  };

  const fontVariants = Object.keys(fontsData[fontFamily]);

  return (
    <div>
      <label>
        Font Family:
        <select value={fontFamily} onChange={handleFontFamilyChange} className='sel'>
          {Object.keys(fontsData).map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
      <label>
  Font Variant:
  <select value={fontWeight + (isItalic ? ' italic' : '')} onChange={handleFontWeightChange}>
    {fontVariants.map((variant) => (
      <option key={variant} value={variant}>
        {variant}
      </option>
    ))}
  </select>
</label>
<label className="switch">
  <input
    type="checkbox"
    checked={isItalic}
    onChange={handleItalicToggle}
    disabled={!fontVariants.includes(fontWeight + 'italic')}
  />
  <span className="slider round"></span>
  <span className="switch-label">{isItalic ? 'ItalicOn' : 'ItalicOff'}</span>
</label>
    </div>
  );
};

export default FontSelector;
// import React, { useState } from 'react';

// interface FontSelectorProps {
//   fontsData: { [key: string]: { [variant: string]: string } };
//   fontFamily: string;
//   fontWeight: string;
//   isItalic: boolean;
//   setFontFamily: (fontFamily: string) => void;
//   setFontWeight: (fontWeight: string) => void;
//   setIsItalic: (isItalic: boolean) => void;
// }

// const FontSelector: React.FC<FontSelectorProps> = ({
//   fontsData,
//   fontFamily,
//   fontWeight,
//   isItalic,
//   setFontFamily,
//   setFontWeight,
//   setIsItalic
// }) => {
//   const [italic, setItalic] = useState(isItalic);

//   const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFontFamily(e.target.value);
//   };

//   const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFontWeight(e.target.value);
//   };

//   const handleItalicToggle = () => {
//     setItalic(!italic);
//     setIsItalic(!italic);
//   };

//   const fontVariants = Object.keys(fontsData[fontFamily]);

//   return (
//     <div>
//       <label>
//         Font Family:
//         <select value={fontFamily} onChange={handleFontFamilyChange}>
//           {Object.keys(fontsData).map((font) => (
//             <option key={font} value={font}>
//               {font}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Font Variant:
//         <select value={`${fontWeight} ${italic? 'italic' : ''}`} onChange={handleFontWeightChange}>
//           {fontVariants.map((variant) => (
//             <option key={variant} value={variant}>
//               {variant} {italic? 'italic' : ''}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button onClick={handleItalicToggle} disabled={!fontVariants.includes(`${fontWeight}italic`)}>
//         {italic? 'Toggle Normal' : 'Toggle Italic'}
//       </button>
//     </div>
//   );
// };

// export default FontSelector;