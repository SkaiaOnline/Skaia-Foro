$(function () {

  window.SZ_MS_VER = "Notifika-v1.0";

  var STORAGE_KEY = "skinz_notifika_v1";
  
  const waitInit = setInterval(function () {
    if (!$('#fa_notifications').length || !$('.nv-notis').length || !$('.noti-inside').length) {
      return;
    }

    // Mover el boton oficial
    $('#fa_notifications').appendTo('.nv-notis');

    // 2- Ancla para devolver el contenedor a su sitio al cerrar
    if (!$('#nv-notif-anchor').length) {
      $('<span id="nv-notif-anchor" style="display:none;"></span>').insertAfter('#fa_notifications');
    }

    // Mover el CONTENEDOR de notif_list
    function moveNotifBoxToDrawer() {
      if (!$('#notif_list').length) return false;

      const $box = $('#notif_list').parent();
      if (!$box.length) return false;

      if ($box.closest('.noti-inside').length) return true;

      $box.appendTo('.noti-inside');

      // Limpieza de inline left/top
      $('#notif_list').css({ left: 'auto', top: 'auto' });

      return true;
    }

    function moveNotifBoxBackHome() {
      if (!$('#notif_list').length) return;

      const $box = $('#notif_list').parent();
      if (!$box.length) return;

      if ($box.closest('.noti-inside').length) {
        $box.insertAfter('#nv-notif-anchor');
      }
    }

    function openDrawer() {
      $('.noti-inside').addClass('open');
    }

    function closeDrawer() {
      $('.noti-inside').removeClass('open');
      moveNotifBoxBackHome();
    }

    // Toggle
    $('#fa_notifications').off('click.nv').on('click.nv', function (e) {
      e.stopPropagation();

      if ($('.noti-inside').hasClass('open')) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      setTimeout(function () {
        moveNotifBoxToDrawer();
        openDrawer();
        $('#fa_notifications').removeClass('unread');
        $('#notif_unread').text('');
      }, 60);
    });

    // Click fuera para cerrar - SIN stopPropagation dentro del box
    $(document).off('click.nvClose').on('click.nvClose', function (e) {
      if (!$('.noti-inside').hasClass('open')) return;

      const $t = $(e.target);

      // Si el click fue dentro del cajón o en el botón, no cerrar
      if ($t.closest('.noti-inside').length) return;
      if ($t.closest('#fa_notifications').length) return;

      closeDrawer();
    });

    clearInterval(waitInit);
  }, 100);

});
