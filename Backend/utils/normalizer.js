const fieldMap = {
  revenue: ["revenue", "turnover", "sales", "income"],
  net_profit: ["net profit", "profit", "earnings"],
  growth_rate: ["growth", "growth rate"]
};

 function normalizeKey(key) {
  key = key.toLowerCase();

  for (const stdKey in fieldMap) {
    if (fieldMap[stdKey].some(alias => key.includes(alias))) {
      return stdKey;
    }
  }

  return null; 
}
module.exports={normalizeKey,fieldMap}
