# Домашняя работа на тему: Шардирование. Принципы работы. Часть 2
## Замечания Преподавателя:
>Добрый день! Спасибо за документ, изучил. Я предполагаю, что если планируется много товаров, да и из разных городов, то возможно, с моей точки
>зрения, было бы проще сделать несколько наборов шардов, в разрезе геолокации. Таким образом, внедрение новых точек не будет таким болезненным, и не
>придется пересчитывать ключи для шарда. В таком случае, поиск будет проводиться уже по 2 критериям: по региону (чтобы знать на какую группу шардов
>сходить), и по штрих-коду. Можно даже заложить регион в штрих код (например 077EAN13, где 077 - Москва). Более того, такой подход, поможет
>обеспечить более высокую отказоустойчивость (то есть, если накроет Москву, тот же Питер не пострадает).
>
>    Буду очень ждать ваших комментариев, и конечно же, реализации.
>

## Предложение на основе замечаний
Предлагается реализовать двух-уровневое шардирование:
1. Шардирование по географическому принципу: для каждой площадки определяется своя шарда (группа шард). Как Вы праильно указали это повысит отказоустойчивость системы;
2. Внутри площадки производить шардирование данных о физическом размещении товаров (по какому адресу-ячейке храниться конкретный товар) на основе штрих-кода товара. Но при этом не удастся избежать перестройки шард при изменении количества шард. Но это автоматизируемый процесс, который может быть произведён в нерабочее время. Следует заметить, что не все площадки будут шардированы по данному принципу, поскольку бизнес-активность на разных площадках различается на порядок. Вполне возможно, что для некоторых площадок шардирование вообще не будет производиться. Таким образом, получается совокупность групп шард, где каждая группа шард определяется географическим расположением (площадкой).

Я попытаюсь реализовать вышеизложенный алгоритм, но мне понадобится некоторое время (большая нагрузка на основной работе), при условии, что
Вы одобрите предлагаемый подход