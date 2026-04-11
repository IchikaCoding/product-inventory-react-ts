// 分割代入

// コンポーネントだから返り値省略
// TODO: プロパティ 'category' は型 'String' に存在しません。とエラーがでた
// コンポーネントがPropsを受け取るためには分割代入！
// `category: string`だとProps全体がstring型の意味になってしまう
// Props全体は{ category: "Fruits" }になる！→引数はオブジェクトになる！

type Props = {
  category: string;
};
export default function ProductCategoryRow({ category }: Props) {
  return (
    <tr className="text-muted small py-2 border-top border-2">
      {/* TODO: 「型stringを型numberに割り当てることは出来ません」と言われた。 */}
      {/* どうして数値型だと{}で囲むの？ */}
      <th colSpan={4} className="fw-bold text-start">
        {category}
      </th>
    </tr>
  );
}
