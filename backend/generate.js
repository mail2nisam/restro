const fs = require('fs');
const xlsx = require('xlsx');

const generate = () => {
// Load the Excel file
const workbook = xlsx.readFile('sampledata.xlsx'); // Replace with the path to your Excel file

// Assuming the sheet you want to read is named "Sheet1"
const sheetName = 'Sheet1';
const sheet = workbook.Sheets[sheetName];

// Convert the Excel sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

// Assuming the first row contains column headers, remove it
jsonData.shift();

// Generate Redux actions and slice code from the JSON data
const moduleData = {};

jsonData.forEach((row) => {
  const [module, apiName, apiEndpoint, parameters, httpMethod] = row;
  if (!moduleData[module]) {
    moduleData[module] = [];
  }
  moduleData[module].push({ apiName, apiEndpoint, parameters, httpMethod });
});

// Generate Redux actions and slice code
for (const module in moduleData) {
  const importStatements = moduleData[module]
    .map(({ apiName }) => {
      const methodName = apiName.replace(/ /g, '').toLowerCase();
      return `${methodName}SliceAction`;
    })
    .join(', ');

  const actionsCode = moduleData[module]
    .map(({ apiName, apiEndpoint, parameters, httpMethod }) => {
      const methodName = apiName.replace(/ /g, '').toLowerCase();
      const apiEndpointConstant = `const ${methodName.toUpperCase()}_API = '${apiEndpoint}'`;
      const paramStr = parameters ? `?${parameters}&` : '';

      let fetchOptions = `
        method: '${httpMethod}',
        credentials: 'include',
        // Add other headers here if needed
      `;

      if (httpMethod === 'POST') {
        // Include the body property for POST requests
        fetchOptions += `,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(${methodName}_data)`;
      }

      return `
${apiEndpointConstant}

export const ${methodName}Action = (${methodName}_data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(${methodName.toUpperCase()}_API + '${paramStr}', {
        ${fetchOptions}
      });

      if (!response.ok) {
        throw new Error('Request failed..');
      }
      const responseData = await response.json();

      dispatch(${methodName}SliceAction(responseData)); // Dispatch the action here

    } catch (error) {
      console.log(error);
    }
  };
};
`;
    })
    .join('\n');

  const sliceCode = `
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ${moduleData[module]
    .map(({ apiName }) => `${apiName.replace(/ /g, '').toLowerCase()}_data: []`)
    .join(',\n  ')}
};

const ${module}Slice = createSlice({
  name: '${module}',
  initialState,
  reducers: {
    ${moduleData[module]
      .map(({ apiName }) => {
        const methodName = apiName.replace(/ /g, '').toLowerCase();
        return `${methodName}SliceAction: (state, action) => {
      state.${methodName}_data = action.payload;
    },`;
      })
      .join('\n    ')}
  },
});

const { actions, reducer } = ${module}Slice;

// Export individual actions
export const { ${moduleData[module]
    .map(({ apiName }) => `${apiName.replace(/ /g, '').toLowerCase()}SliceAction`)
    .join(', ')} } = actions;

export default reducer;
`;

  // Write actions code to a file
  fs.writeFileSync(`${module}Action.jsx`, `import { ${importStatements} } from './${module}Slice';\n\n${actionsCode}`);

  // Write slice code to a file
  fs.writeFileSync(`${module}Slice.jsx`, sliceCode);
}

}

module.exports = {
  generate,
};