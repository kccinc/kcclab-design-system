// Vite `?raw` import — 파일 원본을 문자열로 가져옵니다 (Template 스토리의 Show code 용).
declare module "*?raw" {
  const source: string;
  export default source;
}
