export default function mergeObjectWithNestedArray(inputObj, keysValues, lastValue) {
    const convertArrayToDict = (keysValues, lastValue) => {
      const result = {};
      let currentDict = result;
      for (let i = 0; i < keysValues.length; i++) {
        const key = keysValues[i];
        if (i === keysValues.length - 1) {
          currentDict[key] = lastValue;
        } else {
          currentDict[key] = {};
          currentDict = currentDict[key];
        }
      }
      return result;
    };

    const mergeDicts = (dict1, dict2) => {
      const mergedDict = { ...dict1 };
      for (const [key, value] of Object.entries(dict2)) {
        if (key in mergedDict && typeof mergedDict[key] === 'object' && typeof value === 'object') {
          mergedDict[key] = mergeDicts(mergedDict[key], value);
        } else {
          mergedDict[key] = value;
        }
      }
      return mergedDict;
    };

    const arrayAsDict = convertArrayToDict(keysValues, lastValue);
    return mergeDicts(inputObj, arrayAsDict);
  }