// 'use client';

// import { useState } from 'react';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
// } from 'react-simple-maps';
// import ReactTooltip from 'react-tooltip';

// const geoUrl =
//   'https://cdn.jsdelivr.net/npm/react-simple-maps@3/topojson-maps/world-110m.json';

// export default function WorldMap() {
//   const [tooltip, setTooltip] = useState('');

//   return (
//     <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto' }} data-tip="">
//       <ComposableMap
//         projectionConfig={{ scale: 160 }}
//         style={{ width: '100%', height: 'auto' }}
//       >
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const name =
//                 (geo.properties.NAME as string) ||
//                 (geo.properties.name as string) ||
//                 '';
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   onMouseEnter={() => setTooltip(name)}
//                   onMouseLeave={() => setTooltip('')}
//                   style={{
//                     default: { fill: '#1f2937', outline: 'none' },   // slate-800
//                     hover:   { fill: '#374151', outline: 'none' },   // slate-700
//                     pressed: { fill: '#111827', outline: 'none' },   // slate-900
//                   }}
//                   stroke="#0f172a"
//                   strokeWidth={0.5}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       <ReactTooltip
//         place="top"
//         type="dark"
//         effect="solid"
//         getContent={() => (tooltip ? tooltip : null)}
//       />
//     </div>
//   );
// }
