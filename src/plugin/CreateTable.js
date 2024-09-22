// import { canvasDatagrid } from 'canvas-datagrid'
export default {
    install(Vue) {
        Vue.config.globalProperties.$Create_Table = 
            function(data, id, w, h){
                const app = document.getElementById(id);
                const gridElement = document.createElement('div');
                const grid = canvasDatagrid({
                    parentNode: gridElement,
                    data,
                    style: {
                        /* 0. Size */
                        // height : '260px',
                        /* 1. Column Header */
                        cornerCellBackgroundColor: '#000000', // numbering-side
                        cornerCellBorderColor: "#bbbbbb",
                        columnHeaderCellBackgroundColor : '#000000',
                        columnHeaderCellColor : '#bbbbbb',
                        columnHeaderCellHorizontalAlignment : "center",
                        columnHeaderCellCapBackgroundColor : "#000000", // scroll-bar-side
                        columnHeaderCellCapBorderColor : "#bbbbbb",
                        /* mouse-event */
                            columnHeaderCellHoverBackgroundColor : '#000000',
                            columnHeaderCellHoverColor : '#bbbbbb',
                            activeColumnHeaderCellColor : "#bbbbbb",
                            activeColumnHeaderCellBackgroundColor : "#000000",
                        /* 2. Row Header */
                        rowHeaderCellBackgroundColor : "#000000",
                        rowHeaderCellColor : "#bbbbbb",
                        rowHeaderCellHorizontalAlignment : "center",
                        /* mouse-event */
                            rowHeaderCellSelectedBackgroundColor : "#000000",
                            rowHeaderCellHoverBackgroundColor : '#000000',
                            rowHeaderCellHoverColor : '#bbbbbb',
                            activeRowHeaderCellBackgroundColor : "#000000",
                            activeRowHeaderCellColor : "#bbbbbb",
                        /* 3. Scroll-Bar */
                        scrollBarCornerBackgroundColor : "#000000",
                        scrollBarBackgroundColor : "#000000",
                        /* 4. Cell */
                        cellBorderWidth: 0,
                        cellBorderColor: '#000000',
                        cellBackgroundColor : '#000000',
                        cellColor : '#bbbbbb',
                        cellHorizontalAlignment : "center",
                        /* mouse-event */
                            cellSelectedBackgroundColor : "#000000",
                            selectionOverlayBorderColor : '#bbbbbb',
                            cellSelectedColor : "#bbbbbb",
                            cellHoverBackgroundColor : "#000000",    
                            cellHoverColor : "#bbbbbb",
                            activeCellBackgroundColor : "#000000",
                            activeCellSelectedColor : "#bbbbbb",
                            activeCellColor : "#bbbbbb",
                            activeCellSelectedBackgroundColor : "#000000",
                            activeCellBorderColor : "#bbbbbb",
                            activeCellHoverColor : "#000000",
                            activeCellOverlayBorderColor: "#bbbbbb"
                    }
                });


                app.append(gridElement);

                grid.style.width = w;
                grid.style.height = h;

                grid.addEventListener('rendercell', function (e) {
                    if(e.cell.columnIndex % 2 === 0 && e.cell.rowIndex !== -1) e.ctx.fillStyle = "#595959";
                    if(e.cell.columnIndex % 2 === 0 && e.cell.rowIndex === 0) e.cell.horizontalAlignment = "center";
                    if(e.cell.columnIndex % 2 === 0 && e.cell.rowIndex === 1) e.cell.horizontalAlignment = "left";
                    if(e.cell.columnIndex % 2 === 0 && e.cell.rowIndex === 3) e.cell.horizontalAlignment = "right";
                    // 마우스 클릭으로 셀 선택해도 정렬 내용 바뀌지 않음
                 });
        
                // grid2.addEventListener('rendercell', function (e) {
                //     if (e.cell.header.name === 'col1' && e.cell.value !== 'col1') {
                //         console.log(e.cell.value);
                //     }
                // });

                // grid2.addEventListener('rendercell', function (e) {
                //     if(e.cell.rowIndex % 2 === 0 && e.cell.columnIndex !== -1) e.ctx.fillStyle = "#595959";
                //     if(e.cell.rowIndex === 0 && e.cell.columnIndex === 0){console.log(e.cell)}
                // });
        }
    }
}