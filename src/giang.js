function doSomething() {
  const result = ["may 1", "may 2"]; // tu backen
  const listCu = [...result]; //["may 1","may 2"]
  //object destructoring
  result[0] = 4;
  //result = ["may 1","may fk"]
  //listCu = []
  listCu.map((e) => {
    //neu e ko co trong result thi xoa
    //lan for 1
    //e = may 1, may 1 co trong list moi bo qua
    //lan for 2
    //e = may 2, may 2 ko con trong list moi=> goi api xoa may 2
    //console.log(xoa may 2)
  });
  result.map((m) => {
    //neu m ko co trong list cu thi them moi
    //lan for 1
    //m = may 1, may 1 co trong list cu bo qua
    //lan for 2
    //m = may fk, ko co trong list cu => goi api them moi
    //console.log(add may fk)
  });
  //goi api get lai list
}
