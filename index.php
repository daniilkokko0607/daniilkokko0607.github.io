<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        require './point.php';

        $p1 = new Point;
        $p1->x = 33;
        $p1->y = 4;

        $p2 = new Point;
        $p2->x = 22;
        $p2->y = 2;

        $distance = sqrt((pow($p2->x-$p1->x,2) + pow(($p2->y-$p1->y),2)));

        echo $distance;
    ?>
</body>
</html>
