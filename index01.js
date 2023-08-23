window.onload = (e)=>{
    let data = [["データ1","編集データ1","データ取得"],["データ2","編集データ2","データ取得"]]
    let gr = toGrid(data);
    let g_input;    //グリッド中のテキストボックス
    let g_bt;   //グリッド中のボタン
    let output = document.getElementById("output");

    //Grid.jsのloadが実装されているようですが、なぜか呼び出されません・・・。
    gr.on("load",() => {console.log("grid load")});
    //Grid.jsのloadイベントが使えない様なので、setTimeOutで
    //1000ミリ後にグリッド内に記述したテキストボックスを取得
    setTimeout(() => {
        //グリッド中のテキストボックス
        g_input = [...document.getElementsByName("g_input")];
        g_input.forEach((elem,i) => {
            elem.onchange = (e) => {
                //テキストボックスに入力したデータで、グリッドのデータを更新する
                gr.config.data[i][1] = g_input[i].value;
            }
        });

        //グリッド内のボタン
        g_bt = [...document.getElementsByName("g_bt")];
        g_bt.forEach((elem,i)=>{
            elem.onclick = (e) => {
                //出力
                output.innerText = gr.config.data[i].join(",")
            }
        });
    },1000);

    function toGrid(d){
        let ret;
        ret = new gridjs.Grid({
            columns:[{name:"項目A",
                      formatter:(cell) => gridjs.html(`<span>${cell}</span>`),
                      width:"100px",
                     },
                     {name:"項目B",
                     formatter:(cell) => gridjs.html(`<input value=${cell} size="16" name="g_input" class="g_input">`),
                     width:"150px",
                     },
                     {name:"項目C",
                     formatter:(cell) => {console.log();
                                          return gridjs.html(`<button name="g_bt" class="g_bt">${cell}</button>`)},
                     }],
            data: d,
            width: "500px",
            style:{td:{"padding":"5px","font-size":"11pt","color":"rgb(80,80,80)"}}
        }).render(document.getElementById("gridTag"));
        return ret;
    }
}
