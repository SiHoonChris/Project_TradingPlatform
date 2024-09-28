export default {
    install(Vue) {
        Vue.config.globalProperties.$Create_Table = 
            function(data, id, w, h, rowHeader){
                const app = document.getElementById(id);
                const gridElement = document.createElement('div');
                const grid = canvasDatagrid({
                    parentNode: gridElement,
                    data,
                    showRowHeaders: rowHeader,
                    showRowNumbers: rowHeader,
                    hoverMode: 'row',
                    selectionMode: 'row',
                    style: {
                        /* 0. Grid */
                        gridBackgroundColor: "#000000",
                        gridBorderColor: "#bbbbbb",
                        gridBorderWidth: 0,
                        /* 1. Column Header */
                        cornerCellBackgroundColor: '#000000', // numbering-side
                        cornerCellBorderColor: "#bbbbbb",
                        columnHeaderCellBackgroundColor : '#000000',
                        columnHeaderCellColor : '#bbbbbb',
                        columnHeaderCellBorderWidth: 0,
                        columnHeaderCellHorizontalAlignment : "center",
                        columnHeaderCellVerticalAlignment : "center",
                        columnHeaderCellCapBackgroundColor : "#000000", // scroll-bar-side
                        columnHeaderCellCapBorderWidth: 0,
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
                        cellHorizontalAlignment : "right",
                        cellVerticalAlignment : "center", 
                        /* mouse-event */
                            cellSelectedBackgroundColor : "#082c45",
                            selectionOverlayBorderColor : '#082c45',
                            cellSelectedColor : "#bbbbbb",
                            cellHoverBackgroundColor : "#082c45",
                            cellHoverColor : "#bbbbbb",
                            activeCellBackgroundColor : "#082c45",
                            activeCellSelectedColor : "#bbbbbb",
                            activeCellColor : "#bbbbbb",
                            activeCellSelectedBackgroundColor : "#082c45",
                            activeCellBorderColor : "#bbbbbb",
                            activeCellHoverColor : "#000000",
                            activeCellOverlayBorderColor: "#bbbbbb"
                    }
                });

                app.append(gridElement);

                grid.style.width = w;
                grid.style.height = h;

                grid.addEventListener('rendercell', function (e) {
                    if(e.cell.rowIndex !== -1 && e.cell.columnIndex === 0) {
                        // e.ctx.fillStyle = "gray"; // 가운데 정렬
                    }
                 });
        }
    }
}