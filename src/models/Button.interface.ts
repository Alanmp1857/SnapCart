export interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  minimumOrderQuantity?: number;
  onChange: (value: number) => void;
}
