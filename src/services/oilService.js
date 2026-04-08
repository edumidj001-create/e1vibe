const API_KEY = import.meta.env.VITE_OPINET_API_KEY;

const PRODUCT_NAMES = {
  'B027': '휘발유',
  'D047': '경유',
  'B034': '고급휘발유',
  'C004': '실내등유',
  'K015': '자동차부탄'
};

export async function fetchOilPrices() {
  try {
    // Using the Opinet API through our Vite proxy
    const response = await fetch(`/api/opinet/avgLastWeek.do?code=${API_KEY}&out=json`);
    
    if (!response.ok) {
      throw new Error(`Oil price fetch failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.RESULT || !data.RESULT.OIL) {
        throw new Error('Invalid oil data structure');
    }

    // Filter to only include the products we care about (nationwide average AREA_CD='00')
    const oilItems = data.RESULT.OIL.filter(item => item.AREA_CD === '00');
    
    return oilItems.map(item => ({
      code: item.PRODCD,
      name: PRODUCT_NAMES[item.PRODCD] || item.PRODCD,
      price: Math.round(parseFloat(item.PRICE)),
      unit: '원'
    }));
  } catch (error) {
    console.error('fetchOilPrices Error:', error);
    throw error;
  }
}
