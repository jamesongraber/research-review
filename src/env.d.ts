declare module 'virtual:content' {
  const data: { notes: any[]; items: any[]; subjects: { id: string; name: string }[]; tours: any[] };
  export default data;
}

declare const __BUILD_TIME__: string;
