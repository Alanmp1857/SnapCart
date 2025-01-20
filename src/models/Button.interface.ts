export interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}
