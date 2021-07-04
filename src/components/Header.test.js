import { shallow } from "enzyme";
import Header from "./Header";

it('expect to render Header component', () => {
  const mockTitle = 'title'
  expect(shallow(<Header title={mockTitle} />)).toMatchSnapshot()
})