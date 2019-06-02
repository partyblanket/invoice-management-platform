module.exports = HTMLstring = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style type = text/css>
    .line_item {font-size: 30px;}
  </style>

</head>
<body>
  <div class="pdf" id="pdf">
    <div class="pdf_body">
      <div class="pdf_content" id="pdf_head">
        <div class="pdf_item" id="date">
          12 April 2019
        </div>
        <div class="pdf_item" id="company">
          Company Name
          <div class="pdf_item" id="address">
            <p>Slotenmakerstraat 33</p>
            <p>1901 SB Beverwijk</p>
            <p>The Netherlands</p>
          </div>
        </div>

      </div>
      <div class="pdf_content" id="pdf_main"></div>
      <div class="pdf_content" id="items">
        <div class="line_description line_item">
          an item
        </div>
        <div class="line_amount line_item">
          3
        </div>
        <div class="line_value line_item">
          $4.50
        </div>
        <div class="line_total line_item">
          $13.50
        </div>
        <div class="line_description line_item">
          an item
        </div>
        <div class="line_amount line_item">
          3
        </div>
        <div class="line_value line_item">
          $4.50
        </div>
        <div class="line_total line_item">
          $13.50
        </div>
      </div>
      <div class="pdf_content" id="pdf_foot"></div>
    </div>
  </div>
</body>
</html>
`