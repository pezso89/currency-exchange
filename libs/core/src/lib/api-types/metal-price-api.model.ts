export interface MetalPriceAPISymbolsResponse {
  success: boolean;
  symbols: { [key: string]: string }[];
}

export interface MetalPriceAPIConvertResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    quote: number;
    timestamp: number;
  };
  result: number;
}

export interface MetalPriceAPIErrors {
  success: boolean;
  symbols: {
    code: number;
    info: string;
  };
}
