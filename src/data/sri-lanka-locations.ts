export const SRI_LANKA_DISTRICTS = {
  Ampara: "Eastern Province",
  Anuradhapura: "North Central Province",
  Badulla: "Uva Province",
  Batticaloa: "Eastern Province",
  Colombo: "Western Province",
  Galle: "Southern Province",
  Gampaha: "Western Province",
  Hambantota: "Southern Province",
  Jaffna: "Northern Province",
  Kalutara: "Western Province",
  Kandy: "Central Province",
  Kegalle: "Sabaragamuwa Province",
  Kilinochchi: "Northern Province",
  Kurunegala: "North Western Province",
  Mannar: "Northern Province",
  Matale: "Central Province",
  Matara: "Southern Province",
  Monaragala: "Uva Province",
  Mullaitivu: "Northern Province",
  NuwaraEliya: "Central Province",
  Polonnaruwa: "North Central Province",
  Puttalam: "North Western Province",
  Ratnapura: "Sabaragamuwa Province",
  Trincomalee: "Eastern Province",
  Vavuniya: "Northern Province",
} as const;
export const districtNames = Object.keys(SRI_LANKA_DISTRICTS).map((name) =>
  name === "NuwaraEliya" ? "Nuwara Eliya" : name,
);
export const provinceForDistrict = (district: string) =>
  SRI_LANKA_DISTRICTS[district.replace(" ", "") as keyof typeof SRI_LANKA_DISTRICTS] || "";
