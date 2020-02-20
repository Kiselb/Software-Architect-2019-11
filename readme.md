# Система автоматизации складского предприятия
## Аннотация
Данное приложение является учебным и разрабатывается в рамках курса Software Architect 2019-11 образовательной компании [OTUS](https://otus.ru/)
## API
Актуальная структура API приложения размещена на ресурсе [swagger](https://app.swaggerhub.com/apis/Kiselb/APW/1.0.0-oas3). API представленный на указанном ресурсе является более полным и достоверным нежели описанный API в данном документе. Несоответствие документов объясняется нехваткой времени у автора. Но концептуальные моменты, описанные в настоящем документе, актуальны.
## Предварительная схема архитектуры
Предварительная схема архитектуры размщена на ресурсе [draw.io](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=apw.drawio#R7R3ZcuM28mtUlXmwi%2FfxqMtJKjO1k7g2yTxyLFrSRBa1FD228%2FXLAwAbQFOkJIIUx%2FKDTIK42Hc3GuDInD69%2FhwHu9WnaBFuRoa2eB2Zs5Fh6KZvpP%2BykreixDOtomAZrxekUllwv%2F43JIUaKX1eL8I9VzGJok2y3vGFD9F2Gz4kXFkQx9ELX%2B0x2vCj7oJlKBXcPwQbufSv9SJZkVLf0MoHv4Tr5YoObWjkyVNAa5OC%2FSpYRC%2BgyJyPzGkcRUlx9fQ6DTcZ9ChginZ3FU%2FZzOJwmzRp8Ie7%2B%2F6n9%2B3nP%2FbfNtbnt9%2F%2B%2B%2Ff8y41OuvkebJ7JK5PZJm8UBnH0vF2EWS%2FayJy8rNZJeL8LHrKnLynW07JV8rRJ7%2FT08jHaJgSNeladdB%2FGSfhaOXGdgSMlpDB6CpP4La1CG9gUpoSITArSF4ASi5StIDYcUhgQMliyzktApRcEVsfATRsg3HTTbgg3zVYFt3qwpXyyyy4f3jbrFH5xPey%2BFoD%2B%2BJUVBA%2F%2FLHPw%2F%2Bc5SXsJSXkrQLUFoNoyMWIwNVWRoimDNCW4sZ79TuxR%2BuKell%2Fn5RMvL0lfsih0818tL7wD1eb575hWm5Fq5LZ4qpOusutJfm3m1w4diPUGO%2FHIxES8pzhJeLzukzj6J5xGmyglgtk2yvA4eVxvNkJRsFkvtxnFpDjM6SXD8DoV4mPy4Gm9WGTDoITEs6nIh%2Fk9maTeCv2ITKkjwsxACMhQRUCWK%2BEiXKRakNxGcbKKltE22MzLUgFqZZ2PUbQj6PsWJskbgWXwnEQ8csPXdfI3aZ5df8mub12b3M5ewbPZWwV2UqDHb3kvtza9%2FUIbZjdlN%2Fkd7ad44ewtD6MxBUr0HD%2BEh6BHrJIgXobJITZ1cbqIw02QrL%2FzE2kdx7bTB44r0aVzyCpxdzno0s9FF2n6OVqnUyzZ3xXUB7unfRQzI81KrI%2FjOHgD1XZZhf2hgRxBzviCeVjXwLVNgeyKOZREyMByBl16fcoeHcqe0wSPQMnGBZKyYakhZUcgZV%2FUUG2RsmPhJlclKXuijj22ga97hxs47sEGapjF61VRQ2bRf1hm0R1Fcl%2BQro7eEbNQx6Na7htnNnC0Dmif4E%2Fwcvzc%2BfAt4pf49d7MT%2FmVxZWWnsuUOk2Ft5KWG%2FnvpKG79GFkOJvMi%2Fkac3zq%2FO85C%2FPknHGzz1kjm4yu7V5zMqfP06tl9v9TtF1Gs2zUn8bTX2cf6PAe9bXy65bGuk%2Bf3v%2F%2BMfsN49S5SS%2Fmr7s43O8lcXOZPtpIhVvmN4wxKfPrHZTiG%2Fn1hVfOqFcDFD4G5SZ4OqENYc%2By2z4BY%2FmUKu9AExvwFyz3KMsUo4MSypN3gJEsaRIu6NcGU7H5KRY9TgEUindm9TXQ%2FwTULGbmgj590Nb7MBBWaD9coQvawe07XOHKfDHwEKJpyjDtVNS4fp%2BGJR8BOjkA5PYVAfIampZnR4Aq7DFD8EWshn5Ya27JAdNswptNhgbEONQuMyKQCw3UpQ7jJvYjaDIdzAz2D1vRCH1j%2FZdWu7295czbwnrMUW3yL5leQwPbAOV3BNKFGTM2oRF%2FS634GZipAHloo%2BflJeKK8eCChIDEGXhROo%2BJwfVWNi9xWtrHTvCUqY3t1%2F0ulyC0vjgHNqLFd84APwY1mRVVC0SBQZrw0SBsFhXmu4WtqmA6VZmZ0q9KZWr0%2BGhNi5qxadDl3ADleUvSyAKqiLqLW8q3rYb0rXApHw%2FJHOGgQonNVNYcxFYEZding8pm6Wa%2FPjRNXDB8qS4lQQ9n5gIYwZc36EvCqBLUn3D53bg6pZQbtL6dUt3%2B4bxSu%2B%2FEFv1QBIw3HanlyOzjlFXmhNMM7YY%2BdoG40CSDl0tPuT3c5cie%2FDqjtuxMMjjRODJzNE7yUOx8OGMiDO6P%2BRYVw1a0Hh%2BWM0U71OQ%2FApRF%2FPlEeVjUbyQVNYnjLlMcqrAHHEwCdsutDeJyF2dGuU3BptCMwsMnTfP35sD1pI9woeIfZVsMhJeUmxZO7%2FFu3f%2FhTAu2gtyXaUHHF2OWDbkJuiONuOkW16Jj6JJMgAMCM2jnfHhHaxJKGwj3tiPSbZ62HIRhzU6Ja4h7KjzE2u9YE1IwdaQJNT6cXmU7X%2FUhTyfY3ptO9aHRIF43MH3oIUZGt%2FqwIr3qWH14HE9dtaI6rSiwrY%2Bth3SrFRtEyHrXirqYA4%2BAje1N7UgrnpEHptFwOgtUw9D1VbnpQuaE4%2FWu3Iaf3WTol%2BbsIREWongyihplu8cLGobJsebjo5n%2ByfmyRJeIwc454MQpUJJQE7qYr6hJa%2Fd5z%2FVL%2FLCavD%2BT6eqZNGjz%2FAG4VFctajhJgmr0ipC9eUfrp4gtcEEaDUMgtaNyBP%2FVRTZpd6upGwScLk5Te4jb37Gmpgg5UVOzDDchewsazh7IC4ILzppkH7MlaA%2F0r9E8IrjUDnOr3OreBsGQrVsIhhgmQVJ1u7UQTCRKcnncKW2Pk8HmIVCzlEHtjGQVLc%2FNE9S9zfOOtHzS1EsGq8rlEHLu2DthN5FuPMQgx%2BhGHbcNP6%2FD8AWYIgZGtweW4B7tKcEmmHJbMNO02tBGs6IZwwnaUuhZsKOnQH%2FC9C%2F%2FGtJSZigb4nZzHTGUMVWsjpCHkPIgGspY5mjXhnJ7KQ9CHpXAUSzl4bicUbaLQ9DwNhjeAnsnTOwpKk%2FgPIRMMZbqhWVQXbNCTzAe%2Bs8KNYefumGKied9Z4VauJd9ivVwhCBh6aDQsnc4VY2IGqjRoSkxB04FmdPVcFBoOPARNjRXEtOA6mi4wRJ2uF2MswNMM8Bugv1%2B%2FdDEVqjftiPDCYDBRqBAy87dpmqK4pmeDUv7KLYTSdtU5Z6kzTBiT4o3vFoVq%2BUe0f2idoebE6sie1BICIF3eNjihA8GaiC9Wj9yT40GFgJg9E%2FKXfd1Xr7ICwRHmVfvRu5IBI%2BlWHUa2bcqtmpDAoWay5EIGjVL9QrVS2PTJ9rtgHNqTt8Z0%2Fm8G9piUTB6XA22cu13SVuU2Ps%2FnOyMU0RH3PlkpscOLKs4RSK%2F%2BxzG6xSGGZnMWt5AaxN5WX%2FGn4%2FTy7lKWxMD%2BZpAPy0dW%2BYLp5ZZJGpRaQNo%2BpkN6JsoPbXMRey6oTHFjXar6RbPGY7tDoYzbDWcoYt7GryOOMOoI3TnzAYuOQ5ILWeYw%2BeMAasLVUxhCqSk6nRjTVjUMr06Ivfxmak93XgAmTSe%2BD0DZKkeMyQ9Zd%2FWcIx6qB0bHaniWd0y1fJs%2FYGzGo6ebqIyonbRRYZtHJSx%2FJqeFAdlHCQoM1CquRhiEE2akyN0aU%2BpEWl3SxBI6sYMnhEsrPHBsBk777f1BIN%2Bt5xtwsfk4oIZvvilAiRh3Og0TuZUZKj0SDpCdFc%2BFJGdcccIa3wlJgP9PBNb0%2BwmMCZvB57c3SnAxxAW6VnyGT1OGEnb7vSYPhczG4qV2P0u2HI4AjtBsD0hR0kHYcOGLCxMKSsUXblpuL%2BLr3wRyo1t%2FCjgrGzjxyDElNk0K0udmMIyXa%2BM0IuqvrIGF9pB8jy7XdpCzMFzXcvRhfuC0mdk%2FBN9QTG%2BJHWk2A10kSTd1mz5s4TFzfE683CS%2BllTuToYzcSTxBhYVge2R0WZeKKDDSmrA2RW16cgofP0wDxRelXxlYBB%2BGwtELn0TQmz9%2FwSr8GpWm3Fdx3d73lV4MJyNX0xdtt8WcDge%2FKcbqPAnlFPNn0vwck7F3zZ5O10u6x33kfFoWFQ2DFwy7rJi2RUVzDp7oEK8NCKo%2FbcDkJsq98Pg8TaOt1M61VswobHkPhE%2BbZJSYNAfysYF7JCsZ0OTqdKuy6oBKJGBkCyydt0ggXq8XYfMw%2BnoIcJb3LWeXvXkAukG8voO%2BTi1WWqa%2FTTV%2FCgePlLS4e9HEYSgq%2FAyqFTPeMIphxa%2BNhH3Un80lek3geJSV8L17Ht293SGJKdVaoj6I%2BiHynQyq%2B9cBR1J1ksGu%2FUCt4q80f7Opd9IPRiWz3Ti4%2FHWcYQya6E6nY2db9ftPuOMrSnt3GULV%2BVDmf6mqtP0SLMavwf)
## Краткое описание
Система управления складским предприятием. Предприятие оказывает услуги по хранению товаров клиентов. Приёмка и отгрузка товаров клиентам осуществляется по заявкам клиентов, пользующихся услугами складского предприятия. Клиенты складского предприятия подают заявку на приёмку/получения товаров в виде списка единиц хранения (SKU). Сотрудник складского предприятия подтверждает принятие заявки, с указанием даты и времени приёмки/отгрузки, либо отклоняет, с указанием причины. Заявка клиента представляет собой список мест хранения (коробка, поддон и пр.) для каждого из которых определён перечень SKU (с количеством). Идентификация SKU осуществляется по штрих-коду. В системе должна быть описана структура мест хранения (адресное хранение). Сотрудники предприятия используют программные средства поддержки адресного хранения для подбора и размещения товаров клиентов. Любые перемещения товаров в рамках складского предприятия осуществляются только на основе данных предоставляемых системой - что и где (SKU и в какой ячейке) взять или положить для выполнения заявок клиентов. Дополнительно, должны быть разработаны следующие отчёты: отчёт об инвентаризации как для клиентов, так и для сотрудников предприятия; отчёт о заполнении складских мощностей; отчёт о движении SKU за период. Предполагается использовать следующие технологии: Microsoft SQL Server, Node.js, SPA (React или Angular).
## Термины
### Единица хранения
Единица хранения (SKU – stock keeping unit) – это минимальная значимая единица товара, единичная упаковка товара. Единица хранения не может включать в себя другие единицы хранения, т.е. является атомарной. Каждая единица хранения идентифицируется по уникальному штрих-коду (соответствует артикулу товара по производителю, не серийный номер, а именно артикул) на своей упаковке. Для каждой единицы хранения указывается название (артикул) – для визуальной идентификации, вес, объём и площадь (стороны) основания.
### Поддон
Поддон (pallet) – совокупность SKU, физически размещённых на поддоне. Сущность поддон используется при приёмке и отгрузке товаров по заявке клиент. При приёмке товаров, в заявке, указывается номер поддона (сквозной уникальный номер для данного контрагента), состав поддона – список SKU и их (SKU) количество. Допускается приёмка отдельных SKU, без паллетирования.
### Структурная единица описания хранилища
Структурная единица описания хранилища – узел в иерархическом описании структуры хранилища. Структура хранилища представляет собой дерево. Например, в здании находится помещение, в помещении размещены стеллажи, у стеллажей имеются полки, на полках размещены ячейки. Каждая структурная единица описывается уникальным идентификатором, именем, например, стеллаж А, путём к узлу структурной единицы в рамках дерева хранилища, например, для единицы «Помещение А\Стеллаж С1\Ячейка Я22» - путь - «А\С1\Я22». Путь структурной единицы хранилища уникален (на уровне базы данных). Каждая структурная единица имеет соответствующий тип: здание, помещение, комната, шкаф, стеллаж, полка, ячейка. Для каждого типа определён атрибут Capacity Range, используемый процедурой валидации при формировании описания структуры хранилища (в ячейку нельзя поместить стеллаж и т.д.). Данный атрибут – число, в элемент с большим числом нельзя вставить элемент с меньшим числом.
### Состояние хранилища
Состояние хранилища (единицы хранилища) – запись содержащая идентификатор единицы хранилища и SKU, находящейся в данной единице хранилища, с указанием количества. SKU не обязательно хранятся в структурных единицах хранилища являющихся листьями дерева хранилища. Данное поведение определяется настройками приложения – для всех узлов или персональными настройками узлов. Выбор стратегии для реализации требует дополнительного исследования.

## Модели данных
### Единица хранения (SKU – stock keeping unit)
    SKU: {
        id: string,
        barCode: string,
        name: string,
        weight: number,
        volume: number,
        baseX: number,
        baseY: number 
    }

### Поддон
    PAL: {
        PalleteNo: string,
        SKUList: [ SKU … ]
    }

### Структурная единица описания хранилища
    storageNodeType: { // здание, помещение, комната, шкаф, стеллаж, полка, ячейка
        typeId: string,
        typeName: string,
        capacityRange: number
    }

    storageNode: {
        id: string,
        type: StorageNodeType,
        path: string, // Уникален
        name: string,
        nodes: [ storageNode … ],
        isStorage: boolean // storage not only is leaf
    }

### Элемент описания состояния хранилища
    storageItemState: {
        node: storageNode,
        sku: SKU,
        quantity: number
    }

### Состояние хранилища (единицы хранилища)
    storageNodeState: {
        state: [ storageItemState … ]
    }

## Описание API 
### Заявки на обслуживание
#### Заявка на приём товаров
/warehouse/request/acceptance
Доступ: Клиент, Сотрудник
Метод: POST
Данные:

    {
	    clientId: string,
	    dueDate: datetime,
	    SKUList: [ SKU … ],
        PALList: [ PAL … ]
    }

Ответ:

    { 
        requestId: string
    }

#### Заявка на отгрузку товаров
/warehouse/request/shipment
Доступ: Клиент, Сотрудник
Метод: POST
Данные:

    {
	    clientId: string,
	    dueDate: datetime,
	    SKUList: [ SKU … ],
        PALList: [ PAL … ]
    }

Ответ:

    { 
        requestId: string
    }

#### Состояние заявки
/warehouse/request/id:/status
Доступ: Клиент, Сотрудник
Метод: GET
Ответ:

    {
	    requestId: string,
	    status: string,
	    reason: string
    }

#### Приём заявки в работу
/warehouse/request/id:/accept
Доступ: Сотрудник
Метод: POST
Ответ:

    {
	    status: string,
	    reason: string
    }

#### Отказ в обслуживании заявки
/warehouse/request/id:/reject
Доступ: Сотрудник
Метод: POST
Ответ:

    {
	    status: string,
	    reason: string
    }

#### Выполнение заявки
/warehouse/request/id:/complete
Доступ: Сотрудник
Метод: POST
Ответ:

    {
	    status: string,
	    reason: string
    }

### Структура хранилища
#### Запрос структуры хранилища
/warehouse/structure?storageNodePath=
Доступ: только сотрудник
Метод: GET
Ответ:

    {
        nodes: [ storageNode … ]
    }

#### Запрос свободных мест хранилища
/warehouse/freestorage?storageNodePath
Доступ: только сотрудник
Метод: GET
Ответ:

    {
        nodes: [ storageNode … ]
    }

#### Запрос на добавления элемента хранилища
/warehouse/structure/addstorage
Доступ: только сотрудник
Метод: POST
Данные:

    {
        parentStorageNodePath: string,
        newStorageType: string,
        newStogareName: string
    }

Ответ:

    {
        status: string,
        reason: string
    }

#### Запрос на удаление элемента хранилища
/warehouse/structure/removestorage?storageNodePath=
Доступ: только сотрудник
Метод: DELETE
Ответ:

    {
        status: string,
        reason: string
    }

### Инвентаризация и поиск SKU
#### Инвентаризация предприятия для клиента
/warehouse/inventory&clientid= &type=
Доступ: Клиент, Сотрудник
Метод: GET
Ответ:
Тип краткий

    {
	    type: string,
	    inventory: [
		    { SKU: SKU,  quantity: number } …
	    ]
    }

Тип расширенный 

    {
	    type: string,
	    inventory: [
		    { SKU: SKU, place: storageNode, quantity: number} …
	    ]
    }

#### Поиск SKU
/warehouse/searchsku&clientid= &sku=
Доступ: Клиент, Сотрудник
Метод: GET
Ответ:

    {
	    SKU: SKU,
	    place: storageNode,
	    quantity: number
    }

#### Состояние хранилища
/warehouse/state&storagepath=
Доступ: Сотрудник
Метод: GET
Ответ:

    {
	    SKU: SKU,
	    place: storageNode,
	    quantity: number
    }

### Мини CRM
#### Регистрация клиента
/warehouse/clients/add
Доступ: Сотрудник
Метод: POST
Данные:

    {
	    name: string,
	    email: string,
	    phone: string,
	    contactName: string
    }

Ответ:

    {
	    clientId: string
	    status: string,
	    reason: string
    }

#### Обновление данных о клиенте
/warehouse/clients/id:/update
Доступ: Сотрудник
Метод: PUT
Данные:

    {
	    name: string,
	    email: string,
	    phone: string,
	    contactName: string
    }

Ответ:

    {
	    status: string,
	    reason: string
    }

#### Получение данных о клиенте
/warehouse/clients/id:
Доступ: Сотрудник
Метод: GET
Ответ:

    {
        clientid: string,
	    name: string,
	    email: string,
	    phone: string,
	    contactName: string
    }



