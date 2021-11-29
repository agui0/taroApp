import BaseForm from './form';
import Item from './item';

type FormType = typeof BaseForm
interface FormInterface extends FormType {
  Item: typeof Item
}

const Form = BaseForm as FormInterface
Form.Item = Item

export * from './form'
export default Form