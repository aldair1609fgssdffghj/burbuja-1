var numbers = [];   // Number's Array

/**
 * Button event, call to bubble function
 */
$('#Order').click(function () {
    bubble(numbers);
});

/**
 * Button event, Add a Number to the array
 */
$('#Add').click(function () {
    
    let number = Number($('#Number').val());
    if (number == '')
        return;

    if (numbers.includes(number))
        return;

    numbers.push(number);
    let element = $('#number-block').children().clone();
    $('#Number').val("");
    $('#Main').append(element.html("<span>"+number+"</span>"));
    $('#Number').focus();
});

/**
 * Bubble Function
 */
async function bubble (list) {
    $('#Order').attr('disabled','disabled');
    $('#Add').attr('disabled','disabled');
    var swapped;
    do {
        swapped = false;
        for (let i=0; i < list.length-1; i++) {

            $('.container').children().eq(i).addClass('selected');
            $('.container').children().eq(i+1).addClass('selected');
            await sleep(1000); // Await 1 sec for the effects 

            if (list[i] > list[i+1]) {
                let temp = list[i];
                list[i] = list[i+1];
                list[i+1] = temp;
                swapped = true;
                $('.container').children().eq(i).children().html(list[i]);
                $('.container').children().eq(i+1).children().html(list[i+1]);
            }

            $('.container').children().eq(i).removeClass('selected');
            $('.container').children().eq(i+1).removeClass('selected');
            await sleep(1000); // Await 1 sec for the effects 
        }
    } while (swapped);
    $('#Order').removeAttr('disabled');
    $('#Add').removeAttr('disabled');
}

/**
 * Function for wait 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Input Validation
 */
$('#Number').keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});