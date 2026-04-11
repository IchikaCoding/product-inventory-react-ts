// コンポーネントだから返り値省略
// コンポーネントがPropsを受け取るためには分割代入！
// `category: string`だとProps全体がstring型の意味になってしまう
// Props全体は{ category: "Fruits" }になる！→引数はオブジェクトになる！

type Props = {
  category: string;
};
export default function ProductCategoryRow({ category }: Props) {
  return (
    <tr className="text-muted small py-2 border-top border-2">
      {/* colSpan は number を期待する。数値を渡したいときは{}で囲む
      →文字列なら""で、その他なら「JS式を書く場所」になるように{}で囲む。
      数値や変数は {}で囲めばOk */}
      <th colSpan={4} className="fw-bold text-start">
        {category}
      </th>
    </tr>
  );
}
