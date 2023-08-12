export interface FormType<T> {
  onFinish: () => void;
  defaultValues?: T;
}
