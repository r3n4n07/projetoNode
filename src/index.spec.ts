import { Person } from ".";

test("Testando", () => {
  const Pessoa = new Person();
  expect(Pessoa.sayMyName()).toBe("Renan");
});
