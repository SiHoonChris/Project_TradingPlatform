export function setCalendarBaseStyle() {
    for(const E of document.querySelectorAll(".flatpickr-calendar")) {
        E.style.background = "#000";
        E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
        E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
    }
    for(const E of document.querySelectorAll(".flatpickr-months")) {
        E.style.height = '15%';
    }
    for(const E of document.querySelectorAll("select.flatpickr-monthDropdown-months")) {
        E.style.color = 'white';
    }
    for(const E of document.querySelectorAll("option.flatpickr-monthDropdown-month")) {
        E.style.color = 'black';
    }
    for(const E of document.querySelectorAll(".numInput.cur-year")) {
        E.style.color = 'white';
    }
    for(const E of document.querySelectorAll(".arrowUp") ) {
        E.style.background = 'white'; E.style.top = "10%";
    }
    for(const E of document.querySelectorAll(".arrowDown")) {
        E.style.background = 'white'; E.style.top = "60%";
    }
    for(const E of document.querySelectorAll(".flatpickr-prev-month svg , .flatpickr-next-month svg")) {
        E.style.fill = 'white';
    }
    for(const E of document.querySelectorAll(".flatpickr-innerContainer")) {
        E.style.height = '85%';
    }
    for(const E of document.querySelectorAll(".flatpickr-rContainer")) {
        E.style.width = '100%';
    }
    for(const E of document.querySelectorAll(".flatpickr-weekdays")) {
        E.style.height = '16%';
    }
    for(const E of document.querySelectorAll(".flatpickr-weekday")) {
        E.style.color = 'white';
    }
    for(const E of document.querySelectorAll(".flatpickr-days")) {
        E.style.width = '100%'; E.style.height = '84%';
    }
    for(const E of document.querySelectorAll(".dayContainer")) {
        E.style.minWidth = 'none'; E.style.maxWidth = 'none';
        E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
    }
    for( const E of document.querySelectorAll(".flatpickr-day")) {
        E.style.color="#797979"; E.style.fontWeight="bold";
        E.style.height='100%';   E.style.lineHeight='180%'; E.style.maxWidth='none';
    }
    for(const E of document.querySelectorAll(".flatpickr-disabled")) {
        E.style.color="#393939"; E.style.fontWeight="normal";
    }
    for(const E of document.querySelectorAll(".flatpickr-day.nextMonthDay , .flatpickr-day.prevMonthDay")) {
        E.style.fontWeight="normal";
    }
    for(const E of document.querySelectorAll(".flatpickr-day.selected")) {
        E.style.color="white"; E.style.fontWeight="normal";
        E.style.background="darkgreen"; E.style.borderColor="darkgreen";
    }
}
