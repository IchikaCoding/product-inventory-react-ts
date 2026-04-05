// コンポーネントだから返り値省略
// TODO: プロパティ 'category' は型 'String' に存在しません。とエラーがでた
export default function ProductCategoryRow({ category }: string) {
  return (
    <tr className="text-muted small py-2 border-top border-2">
      {/* TODO: 「型stringを型numberに割り当てることは出来ません」と言われた。 */}
      <th colSpan="4" className="fw-bold text-start">
        {category}
      </th>
    </tr>
  );
}
