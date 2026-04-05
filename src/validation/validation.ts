// 商品の入力データをバリデーションする関数

// TODO: productPriceが空文字か数字の文字列が入る→その場合はstring型
// 空文字を返す場合もstring型でOK
export function validationPrice(productPrice: string): string {
  //   String()が要らないかも！
  //     →フォームの <input> から来る値は通常 string文字列しか受け取らないから、String()は不要かも？
  //   念のために書いておく！
  if (String(productPrice).trim() === "") {
    return "Please enter the price";
  }
  const price = Number(productPrice);
  if (!Number.isFinite(price) || price < 1 || price > 100000) {
    return "価格は1〜100000ドルで入力してください";
  }
  return "";
}

// 引数は空文字か、文字列→この場合って、string型としてOK?
// TODO: もとのJSではトリムするのは関数の手前だった。今回はそれを修正して関数内でtrimすることにする！
export function validationTrimmedName(trimmedName: string): string {
  if (!trimmedName) {
    return "商品名は空白NGです";
  }
  return "";
}
