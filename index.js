var correctCards = 0;
$(init);
var rewardCounts = [];
function init() {

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css({
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    });

    // Reset the game
    correctCards = 0;
    $('#cardPile').html('');
    $('#cardSlots').html('');

    // Create the pile of shuffled cards
    var rewards = ['R1', 'R2', 'R3', 'R4'];


    for (var i = 0; i < rewards.length; i++) {
        rewardCounts.push(0);
        $('<div class="draggable">' + rewards[i] + '</div>').data('reward', rewards[i]).attr('id', 'R' + i).appendTo('#cardPile').draggable({
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true,
            axis: 'x'
        });
    }

    // Create the card slots
    var categories = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

    for (var i = 1; i <= categories.length; i++) {
        $('<div>' + categories[i - 1] + '</div>').data('reward', i).appendTo('#categoryHolder');
        $("#cardContainer").append('<div class="cardSlots" id="cat-' + i + '"></div>');
        for (var j = 1; j <= rewards.length; j++) {
            $('<div>' + categories[i - 1] + '</div>').data('reward', i + '-R' + j).appendTo('#cat-' + i).droppable({
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
        }
    }
}

function generateReward(id) {
    rewardCounts[id]++;
    $('<div>' + id + '</div>').data('reward', id).attr('id', 'new-' + rewardCounts[id] + '-' + id).appendTo('#cardPile').draggable({
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true,
        axis: 'x'
    });
}


function handleCardDrop(event, ui) {
    var slotArr = $(this).data('reward').split('-');
    var slotNumber = slotArr[1];
    var cardNumber = ui.draggable.data('reward');

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again
    if (slotNumber == cardNumber) {
        ui.draggable.addClass( 'correct' );
        //ui.draggable.draggable( 'disable' );
        //$(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        // $element = ui.helper.clone();
        // $element.draggable('option', 'revert', false);
        // $element.attr("id", cardNumber + 1);
        // $element.selectable();
        // $element.addClass('mapped');
        // $element.appendTo(this);
        // //$element.position({ of: $(this), my: 'left top', at: 'left top' });
    }
    else {
        ui.draggable.removeClass('mapped');
        ui.draggable.draggable('option', 'revert', true);
    }
    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    // if (correctCards == 4) {
    //     $('#successMessage').show();
    //     $('#successMessage').animate({
    //         left: '380px',
    //         top: '200px',
    //         width: '400px',
    //         height: '100px',
    //         opacity: 1
    //     });
    // }

}