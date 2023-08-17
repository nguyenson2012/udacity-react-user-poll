import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("will match snapshot", async () => {
    const component = render(<Header />);
    expect(component).toMatchSnapshot();
  });
});
