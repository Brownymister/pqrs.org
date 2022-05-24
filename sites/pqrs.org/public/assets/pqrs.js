$(function () {
  const $supportersOuter = $('#supporters')
  if ($supportersOuter.length > 0) {
    $.ajax('https://pqrs.org/supporters/supporters.json').then(
      (response) => {
        let $supporters = $('<div>').addClass('supporters')

        let scale = null
        response.forEach((sponsor) => {
          if (scale !== null && sponsor.avatar.scale !== scale) {
            $supportersOuter.append($supporters)
            $supporters = $('<div>').addClass('supporters')
          }
          scale = sponsor.avatar.scale

          const name = sponsor.name !== '' ? sponsor.name : sponsor.login

          const $img = $('<img>')
            .attr('src', sponsor.avatar.url)
            .attr('alt', name)
            .attr('width', 80 * sponsor.avatar.scale)
            .attr('height', 80 * sponsor.avatar.scale)

          const paddingY = 10 * sponsor.avatar.scale + 'px'
          const paddingX = 5 * sponsor.avatar.scale + 'px'
          const $a = $('<a>')
            .attr('href', 'https://github.com/' + sponsor.login)
            .attr('target', '_blank')
            .css({
              width: 100 * sponsor.avatar.scale + 'px',
              padding: paddingY + ' ' + paddingX,
            })
            .append($img)
          $a.append($('<div>').text('@' + sponsor.login))
          if (sponsor.name !== '') {
            $a.append($('<div>').text(sponsor.name))
          } else {
            $a.append($('<div>').css({ height: '15px' }))
          }

          switch (scale) {
            case 4:
              $a.css({ fontSize: 20 })
              break
            case 2:
              $a.css({ fontSize: 16 })
              break
          }

          if (sponsor.tier >= 40) {
            $a.addClass('gold')
          } else if (sponsor.tier >= 20) {
            $a.addClass('silver')
          }

          $supporters.append($a)
        })

        $supportersOuter.append($supporters)
      },
      (reason) => {
        $supportersOuter.append(
          $('<div>')
            .addClass('alert alert-danger')
            .text('Error: Failed to fetch the sponsors list.')
        )
      }
    )
  }
})
