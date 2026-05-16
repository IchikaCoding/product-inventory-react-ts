import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";
import type { Dispatch, SetStateAction, RefObject } from "react";
// import type { Product } from "../data/products";

/**
 * 商品を表示する部分の描画を担当しているコンポーネント
 * @param {Object} props
 * @param {string} props.filterText
 * @param {boolean} props.inStockOnly
 * @param {(deleteBtnId: string) => void} props.handleDeleteButton
 * @param {string | null} props.editingId
 * @param {(editingBtnId: string) => void} props.handleEditButton
 * @param {(value: string) => void} props.setDraftName
 * @param {(value: string) => void} props.setDraftPrice
 * @param {(value: boolean) => void} props.setDraftStocked
 * @param {(value: string) => void} props.handleSaveButton
 * @param {(cancelBtnId: string) => void} props.handleCancelButton
 * @param {string} props.draftName
 * @param {string} props.draftPrice
 * @param {boolean} props.draftStocked
 * @param {string | null} props.errorMessage
 * @param {Array} props.visibleProducts TODO: ここの書き方が違うかも？！
 * @returns {JSX.Element}
 */

type ProductTableProps = {
  filterText: string;
  inStockOnly: boolean;
  handleDeleteButton: (deleteBtnId: string) => void;
  editingId: string | null;
  handleEditButton: (editingBtnId: string) => void;
  handleSaveButton: (
    saveBtnId: string,
    nameInputEl: HTMLInputElement,
    priceInputEl: HTMLInputElement,
  ) => void;
  handleCancelButton: (cancelBtnId: string) => void;
  setDraftName: Dispatch<SetStateAction<string>>;
  setDraftPrice: Dispatch<SetStateAction<string>>;
  setDraftStocked: Dispatch<SetStateAction<boolean>>;
  draftName: string;
  draftPrice: string;
  draftStocked: boolean;
  errorMessage: string | null;
  visibleProducts: string[];
  // TODO: これのMapオブジェクトの実際のキーと値がわからなかった
  // 👉️確認する方法を調べる
  deleteBtnRefs: RefObject<Map<string, HTMLButtonElement | null>>;
};

export default function ProductTable({
  // products,
  filterText,
  inStockOnly,
  // filterCategory,
  handleDeleteButton,
  editingId,
  handleEditButton,
  handleSaveButton,
  handleCancelButton,
  setDraftName,
  setDraftPrice,
  setDraftStocked,
  draftName,
  draftPrice,
  draftStocked,
  errorMessage,
  visibleProducts,
  deleteBtnRefs,
}: ProductTableProps) {
  // カテゴリと商品の情報をいれるための配列
  const rows = [];
  // カテゴリが変わったことを判定するための変数
  let lastCategory = null;
  // // TODO: productsの手前でカテゴリ順に並び替えること
  // const sortProducts = products.toSorted((a, b) =>
  //   a.category.localeCompare(b.category),
  // );
  // //nullなら全部合格。カテゴリが一致するものがあったら一致のカテゴリだけ合格
  // const filterCategoryProducts = sortProducts.filter((product) => {
  //   return filterCategory === "All" || filterCategory === product.category;
  // });
  // console.log("filterCategoryProducts", filterCategoryProducts);

  // forEachは配列の要素一つずつに指定した処理をするメソッド
  visibleProducts.forEach((product) => {
    // 商品の名前を全部小文字にしたものと、検索したい文字として入力された小文字文字列が一致しない場合はリターンする処理
    // indexOf()は文字列と検索したい文字列が一致しなかったら-1を返すメソッド
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    //! 「ストックがあるものだけ表示するがチェックされているとき」かつ「ストックがないとき」はリターンする
    if (inStockOnly && !product.stocked) {
      return;
    }

    // lastCategoryがカテゴリーの文字列
    if (product.category !== lastCategory) {
      // カテゴリーが変わったことを判定するための条件分岐
      rows.push(
        // カテゴリが変わったら、カテゴリ表示のためのコンポーネントを追加する
        // ! 更新を速く・正しくするためにkeyが必要
        // propsとしてカテゴリを渡している
        // TODO: どうしてKeyを渡しているのに，ProductCategoryRow componentでは使用していないのはどうして？
        // key は React の特別なprops→リスト要素を識別するためだけに使っている。子では受け取れない
        // product.categoryは文字列
        // Props全体は{ category: "Fruits" }になる！→子componentでは，引数がオブジェクトになる！
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    // 商品を表示するためのコンポーネントを配列に追加
    rows.push(
      <ProductRow
        product={product}
        key={product.id}
        handleDeleteButton={handleDeleteButton}
        editingId={editingId}
        handleEditButton={handleEditButton}
        handleSaveButton={handleSaveButton}
        handleCancelButton={handleCancelButton}
        setDraftName={setDraftName}
        setDraftPrice={setDraftPrice}
        setDraftStocked={setDraftStocked}
        draftName={draftName}
        draftPrice={draftPrice}
        draftStocked={draftStocked}
        errorMessage={errorMessage}
        deleteBtnRefs={deleteBtnRefs}
      />,
    );
    lastCategory = product.category;
    console.log("lastCategory", lastCategory);
  });

  console.log("rows", rows);
  return (
    // table-responsiveでスマホ（細い画面）でも横スクロールを可能にする
    <div className="table-responsive">
      {/* align-middleでvertical-align: middle;が当たる。つまり、テーブルについていたら、その中のth,tdはセルの垂直方向の真ん中に表示するってこと */}
      <table className="table table-striped table-hover align-top">
        <thead className="table-light">
          <tr className="table table-secondary">
            <th style={{ width: "37.5%" }}>Name</th>
            <th style={{ width: "37.5%" }}>Price</th>
            <th style={{ width: "12.5%" }} className="px-1">
              Edit
            </th>
            <th style={{ width: "12.5%" }} className="px-1">
              Delete
            </th>
          </tr>
        </thead>
        {/* JSXの要素の配列はReactが展開して、順番に表示してくれるらしい！！ */}
        <tbody className="align-top">{rows}</tbody>
      </table>
    </div>
  );
}
