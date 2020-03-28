# Домашняя работа на тему: Паттерны и антипаттерны декомпозиции микросервисов (Задание №3)
## Аннотация
Данный документ содержит описание домашней работы по заданию №3. В качестве базового проекта выбран проект по автоматизации складского предприятия.
Описание проекта приведено [здесь](https://github.com/Kiselb/Software-Architect-2019-11), файл Readme.md.
Структура микросервисов приведена [здесь](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=apw%20(21).drawio#R7V1Zc%2BM2Ev41qkoerOJ9PEqWnE0lU5nEm93J05bGom1NZNFL0Rk7vz48ALDRaIqQeEgaeVLliBAJQo0%2Bvm40GiP7%2Bun1h2Tx%2FPghXkbrkWUsX0f2bGRZpmME2f%2FylreyJTDDsuEhWS3ZTVXD7erviDUarPVltYy20o1pHK%2FT1bPceBdvNtFdKrUtkiT%2BKt92H6%2Fltz4vHiKl4fZusVZb%2F7tapo%2BsNbSM6ot%2FRauHR%2F5qy2DfPC343axh%2B7hYxl9Bkz0f2ddJHKflp6fX62idU48TpnzupuZbMbIk2qQ6D3y4%2Fzr%2F9X%2B%2FLFd%2Fx7e%2Fu%2F%2BeXD0ZH65cr%2Bzmr8X6hf1kNtr0jdMgiV82yyjvxRjZ06%2BPqzS6fV7c5d9%2BzWY9a3tMn9bZlZl9vI83KZtGM7%2BddR8lafRaO3BTkCNjpCh%2BitLkLbuFP2D4jISMiXxO0q%2FVlAiOeYSzYbiMFRgbPIjOK0JlHxit9qCbE3RMt%2BVi%2B1jcyy8%2BLtI0SjZFi2UUpF2t19fxOk6K7u2bSf5fRyR2HJnENkFi2ydILG5sQ%2BLf%2FOe%2F%2FhN8%2BeG37Ze18%2FHtp98%2Fzf%2B4Ms1BWFMhEkHKHXRzZbqZLsGaDsWaXgd0o0XaVMgULTOlxi7jJH2MH%2BLNYj2vWqcyIat7fo7jZ0a%2BL1GavjH6LV7SWCZu9LpKP4HPf%2BRdjS2XXc5eWdfFxRu7KAeaj24332Y%2FJn5J7qJd3GLQE5VE60W6%2Bkt%2BAUVz9ujHeJW9uprgAE1wgKYtXSQPUcqeqmZukiSLN3Dbc37Ddsd7HAsxUhDI2rzpgcBAnFMOoeIjQZQWImmcgUgagYZIWpRIur2psmayZejgOf9497ZeZfRLmmn3uST0z59Fw%2BLuz4eC%2FL%2B8pFkvEWvvgqgmMsHiGhCVUnN2XyS1VZJmDDcx879Td5T98IwN8s9F%2BzQoWnJLWlz6xV%2BjaLwBt82LvxN%2B24zdxi7Lb03WVf55Wny2i88ef5HoDXYSsIHhec8mIJXndZsm8Z8RN%2FSbOJ9HyfazpsV69ZDDg7tsWgt%2ByadzlUHXCfviabVcFsqdYiRZTLEcFtdskPVKuY1QUhCOEsre4AVHvsOaSUzojKTJ2yduG%2FOL0nC6%2FLIynMWVbDmJOSnt0S5d5JNWt3vL6SPL6WP12pXptA35RZaPHCHlAa%2FlAz7zK0hjqzFAzNQlulEo0ZXZdoPLZHV%2BY%2B%2Bs7iFWD%2FEEd8bqNuKk0GrgXPRAYDutOJe9byjODfzL5FzTHopzQ3mCPeyWdsa56EWW26Rz0QOub7fiXGx9euZcZ0Th07CAjaHDEGXYjEO%2FKz45UmuFOa853C1xZtZuFX%2BnmkD3%2B5HlrXP8%2BTmRpMz7%2F0seliwk4WpbiEI%2BGNN4fi34mn%2BffXrI%2F%2F8h3jzEs%2Fyt302uf5x9z18fcJRcfO7oXbfZt7e%2F%2Fpz%2FjZIMg2Yf5q%2FPSbTdKsriNNF1rV7YxyGzajAFANTmoB4ZEUnW9chKf0pwrwE4fALabfDtlD8Ie1Ydril4V8i58gY84gL5gu0BF5ny7aCFy%2BQNECRHGYQP%2BnXBUFx5iGWP14AK5W8W9xug%2Fym4sxyZD%2FoMwbPB92ciCp07mkpAlnI0KbnozdH0Vbk4s%2BCPh2ypiF0fK%2FhDLL4I4zqVDZ9lAEGE%2BmHGRKrUIUNqIWlg34IuMsHIYP%2FwKR4d09Zg2W3j8VgCKKX9L6baln9k9hlCJAu03zBKl4ZoYkMYNuY4bAZGiigPUVbRXk1c%2BT4YDESTOAM%2FlI9jakm9VY9Xc1ohHG%2FxlAv%2B5vP2uZBlfj8eg3ijI3cuCD8Bdwo72EhEJCA6cnQWVqcLpegiQ2M5rh4A683QhMfwlfm6H%2FOG2cof%2F4Ze9tOejsZVP0fTn3a6dqfbLQcRixd46o6%2BjIaBlKsLpDpJuqDpRjvVe7gYUGMLkzUH3jEyhsd0McQo%2FfxvCKGJD15fmUtF0cOR%2BYBG8Mdb%2FEfCuAC0n3Dpy3p3K5g0OOGx3QrTPXu%2FAptQ1z6yX2HuimHI0JEjR4GPM1GZM0mzjCs5wDcD8gQBr7Q0PN7d5cid%2FjjjWHamAE4yEigcjYM8FLd4nTVFLw8n8hM1r615erJbz5TPkZB%2FD1KWEcQD9WF5v5ZWNBSJO0112IkGRGugbkBoQCoJsz9p1YisnByM8ojYCankwt7IRkdPdFNn5sDz5F%2FROiXcC1qciSj1jiw85%2BjIIvzmkIV37HQ1Plk4ZKkpTdAb0ZKmMW1EJ9AjmQL%2FAyavzeXojqETSTsT6e2Et7h%2Fy5OBTJW3TNvth7nIjG9LQ2CHCAXxNAlxUaZJ%2BE15EtLehxEVqTksOrRnTlzb7Iq9cyLEPhaxOaohJwI%2F4FsBYp4ekr6FiJwTzPIDf6zGY2mgZY37ClhxSg0EtQx5uabON7t0wIW2OvmuJqP0BrgsjXjwmQGuwFCJOizgqknA2hdw7SdT77CrR9iFOIxab7MHZTGNCOzRDSPeO%2BvynauD7J2l6Xb%2BGTEmjly7FNwYVuFRO5JLZZTz1SjfI8%2F3Dlcplfb9vZ39U7MsmX7BAdY5wCzXQHFC7ehTDqqh5AsUPTenFcDb1P1YQn%2FPlJfq5yzA5cF6UCZBJ1LL1ywT2Df8%2Fmxiy7lgD12O9jZN2Wn2SKd5UHnRcJpPTnsHVPR4WO1t05EsXZ9GfIWW32G%2BFUxahwhJ3cZ0mgLT%2Fe5JzAY24bJQbNCby2ITnu3pSQ%2FadOr7KtkCgmpOb1RrkcBiFPl6yBy7suwoayq6ng1Yaa5eoeaTXYq4Yb4hlmQovulP2s4%2F1wMj5oCQxWELCNC5HocECGAabilM1%2FVAmMyUFgLHRZnuGeHca2A%2FYUpY%2BB6GGAzIhiYRhqAKGfTHyGeRBuHIZLN10yBMsze6dZcHgXKrkESJPIj98kjFzg5k4V3wegfsp7Cpb0l9AseBssdE%2BheVVfWeKXoIpxNJjcMuL9jfQD4HJiqRfDYoenBoL%2FgQ9LCHIhEpohDZe5KpJlQNtOgQSsyBU8HG9A4cegMOjiezsKjfdrT8SaqGZT4rcGcb5CCPGZUG82DWiMAEcOgB9hOg4YbaBhM%2BnovhLQs5rKIILQSl4ZC85Z5BdBWXdjSJmDRFNNPoLUDkEY7%2BDNYJQYgQbmaaYjGplHVLd%2FS4SSXr6D49OZELcSEmSpsPup7hq2la05ubM1GCXaNwEV3i06NZsaC%2FIhBE5JdBre3zYiPNEViKpRZl99IFaMVUVQ12w04aaalV7D6E%2BxGh8Ms3n4Q%2BEiuvJZ17W3k9TTWFgIFDOaODgk6fCmW%2FC8IBgmDKO5rVoiWO8ism8iDfRQOKRkAEcgfFzL7GWQzRZjnJj7XI7fB6sd2u7g6EyY2lEAAZXIIKvK1lAUIPJeMq295qyvQpHWEwr3RUU8iwqyx5n4jCd4bcWymLq%2F1t5u5VqFZDaa%2B1LkM9KYJBVLE3qUXo%2Fopu1YQ8TzlcBJZOpIqUJedeK2NTxxmAcZL82kdpsLPw2TpgctPDgStiL8awRjiwmo3wsQNXyl58SjkMmtgUtDuOAWr40iA5QERsWbZIoRdiGoAbYPrvXtlRZyF%2F3a9cYq4i4qGDpj0FNelyMKE7ZFq0S046i%2BnvZMb9Zj3iDap9m5akDF5%2FElZrUcsd7kYdgnmQ7RbtEOTCfQ%2FQ1UcVt5rK4SilHC8DxioHB1lEJYaBLTyxNFVpFYgPyUpBRlVyTeKoG8XwGDLIROhR4MNjVUc5TX4R1mSX39MXv9DVFXoGhIQdb3eWo4nsuGlQm22oHEW%2FLxq2g4dzICc3ioBZkkxmlHrZPnLZsmUrYcgnKYjgCmkrzjj9vVv%2BEZHSJvbpAgjSp62emwhaKEvYNDzNNOHeRJDOLOhHBKOrp8Vq%2FS6EbTjIwkqc2IQyrBRShePw7DStT5QPNFf3OdZ6ROiYiOx8X%2FW%2BCxKEGcZddbckQc8XDXSxM2XsjL5epPSFIZ46KqFuUOHTqcLUexJ3S1yBz5A1Bqz3SxOVwPb7Sch5RYva4kIMaohoPaWb%2B5u%2FvoFhF2TDpclC3dLh%2FR0Rr1O5hiuT%2B3X0ykz6lLTu28yMpWdt9M0Am2rTQZ1oW33cFV5y6dnmOztPYZuDv2b9Zi%2FNRRB9fZVE29Xfi89FV7lYscqIWb%2FuNC%2F4bU%2FXi8%2FReiqMD9eMRYGa%2FN8uWbyLN5voLmX9j4QNhvy1QwxqJdcYB7Ypw0G3E34T8sd6vcosodxHfH%2B%2FjXphEKvFMX0oPAqD73WbBi%2FWf8PlykLdAEB%2FCFJjn%2FC3quDxMbeZLxYequDxrhGlq55VPFWApymDNhe6KyY%2F%2BdEIRey%2Fg6zaS81oPVGIHuKgEbHtYdjFE%2FskDvA%2BXD91rXhczfO1m3sSe%2FwaNNj%2BValxGgh7UX1VanwyiNfwQB1RuipjTXOi6qof8yj5K2NsGMFIKpTuhaJyek2l9OLqY5SsMmrk%2Bme2D3drFEK3OymErs64eniMUnS7q4PmHbyAbDVwI37AYZWBDj1oHgO47g6apz0%2BNUh7DL5mx0CanKvZQZCZD8XPhaTPgswvMEMffJCAviQ0nh1gHltkfMRXnhGMfT2Zae7M8lwtJt3feOB9sYHXMDL0gOPY%2FdsCHt0h4r5kkih0i2FeOgKsmodKdo5G%2B8rkabmCiXO7LcID7mvvIT3tFj3tFpglF2QR7z5hwZRO55O%2B2p0JeCHz7yGb7w9ZlIKef41zFr65c3L692k8nLOiHUtRHIHq1JauYaEy6LDJq7FaPuAG3R7OQ7N0zTEXHai0259%2BvxxdhU9JOHrgxKmpBPMOUTqddrSiTSWnDwtRanJ21H0tMJQ6keaWLuFmAQaBm55gvHcyyG6Y0%2BQFH224pU4o8IdkBbcGre67BNdHIbTTnEIcijl%2B%2BNvVQZyHrbkJFClwYokire6CJDD2sSP%2F5miretjDrBLK9kai%2BFA4taueV%2FVcjVSmQzmlis2ZvhSbs33%2BvX5wTp99YIytPq3%2FaNxjK1N%2BaO0RJcVL7apv7qGrj%2BxxKIvYF2vJZgTsd8S7aSfg2XPcQdt5zgc%2BpsWjMv36OqaF5otTKP3cMoyIjDp1GMegScMcVNBJw%2BrezelZCUUXU2b6IowjjuNVJ43X2xpm0ggwrWVeNRDXgIDL9Y5pMkN8cq5vHWgwDXyQNe6pZ3vpHYrLB2SHU5nl0Dx4ln2lJ83wbmfzfCiqpua5SNlw5cn2PL9huvtO2SjxxKkwi%2Bi3NbNkPQ3NLBq7Ik6ZWU6FB0xeYeMAHgjGIe5rbDhh9a8rlsgukzjPfq1uz%2BDR44d4GeV3%2FAM%3D).
## Сервис заявок клиентов
Сервис заявок клиентов предназначен как для регистрации заявок клиентов на приёмку/отгрузку товаров, так и для регистрации внутренних 
заявок предприятия на проведение регламентных работ по обеспечению хранения товаров (уплотнение хранилищ, реорганизация хранилищ,
инвентаризация и т.п.).
Заявка представляет собой список товаров (SKU) - состав заявки, по отношению к которым необходимо провести определённое действие
и в указанный срок - указываются в заголоке заявки.
Сервис предоставляет данные пользователям (клиентам и сотрудника) о состоянии заявок:
* заявка зарегистрирована
* заявка принята
* заявка отклонена
* заявка в процессе исполнения
* заявка выполнена
Сервис обеспечивает доступ к данным о заявках со стороны интерфейса пользователя в следующих режимах:
* активные заявки. Заявки, находящиеся в режимах , отличных от Отклонена и Выполнена;
* в процессе. Заявки находящиеся в состоянии В Процессе исполнения;
* закрытые. Заявки находящиеся в состояниях Отклонена и Выполнена, но не старше одного месяца от текущей даты
* архив. Заявки находящиеся в состояниях Отклонена и Выполнена, и старше одного месяца от текущей даты
Доступ к тем или иным заявкам определяется сервисом авторизации на основе данных об операторе и клиенте - источнике заявки.
Т.е. правила доступа к заявке наследуются из правил доступа данного оператора к данным по конкретному клиенту.
Дополнительно, в системе определяются разрешения по выполнению операций для данного пользователя (сервис авторизации).
Состояние заявки определяется состоянием всех операций по изменению состояния хранилища по данной заявке. Обновление
осуществляется по таймеру, в задаваемые конфигурацией промежутки времени.

## Сервис структуры хранилища
Данный сервис управляет структурой хранилища всего предприятия. У предприятия может быть несколько географически
удалённых плащадок в разных городах. Для каждой пощадки определена структура хранилища. Структура хранилища представляет собой
древовидную структуру. Описание структуры хранилища приведено в описании проекта [Курсовой проект](https://github.com/Kiselb/Software-Architect-2019-11)
Для обеспечения отказоустойчивости предлагается реализовать шардирование:
1. Шардирование по географическому принципу: для каждой площадки определяется своя шарда (группа шард);
2. Внутри площадки производить шардирование данных о физическом размещении товаров (по какому адресу-ячейке храниться конкретный товар) на основе штрих-кода товара.
Но при этом не удастся избежать перестройки шард при изменении количества шард. Но это автоматизируемый процесс, который может быть произведён в нерабочее время.
Следует заметить, что не все площадки будут шардированы по данному принципу, поскольку бизнес-активность на разных площадках различается на порядок.
Вполне возможно, что для некоторых площадок шардирование вообще не будет производиться.
Таким образом, получается совокупность групп шард, где каждая группа шард идентифицируется географическим расположением (площадкой).
Доступ к данным о структуре хранилищ и возможность выполнения операций над структурой хранилищ регламентируется сервисом авторизации.

## Сервис состояния хранилищ
Сервис состояния хранилищ выполняет задачу хранения состояния хранилищ. Данный сервис может быть реазован с использование
базы данных ключ-значение. Ключ представляет собой конкатенацию ключа элемента хранилища и ключа идентификации SKU. Значение -
количество конкретного SKU конкретного клиента в данном элементе хранилища. На основе данных о состоянии хранилища формируется 
список операций, выполняемых по заявкам клиентов

## Сервис формирования списка операций
Сервис формирования списка опреаций предназначен для планирования операций по изменению состояния хранилищ
для обеспечения выполнения заявки. Проще говоря, позволяет задать что куда положить или что откуда взять.
Список операций формируется оператором на основании собственно заявки, которую следует исполнить, и состояния хранилища.
Планированием занимается только один человек для данной площадки предприятия. Под площадкой понимается обособленное и географически
отдалённое подразделение предприятия, как правило отдельный склад. Т.е. в рамках склада планирование выполняет один человек.
Это позволит избежать конфликтов при формировании списка операций, которые могут возникнуть в случае конкурентого
доступа к одному и тому же элементу хранилища одного и того же товара.
Каждая операция имеет собственное состояние: Размещена, Блокирована, Выполнена и Отклонена. Состояние Размещена -
начальное состояние. Состояние Блокирована означает, что данный товар в указанном элементе хранилища блокирован в указанном количестве,
и не может быть использован при размещении других заявок клиентов. Состояние Выполнено означает, что данная строка (операция)
выполнена: товар отгружен клиенту или принят на хранение. Состояние Отклонена используется, если операция не может выполнена
физически, например, при недостаче товара в элементе хранилища.
Переход операции в состояния Блокировано и Выполнено запускает распределённую транзакцию в рамках которой изменяется
собственно состояние операции и состояние счётчиков состояния элемента хранилища (сервис состояния хранилища).
Следует отметить, что данные сервиса списка операций позволяют восстановить состояние хранилища в случае
возникновения сбоя.

## Сервис описаний товаров (описаний SKU)
Сервис описаний товаров (SKU) предназначен для хранения и предоставления данных о товарах. Идентификация конкретного
товара определяется по суррогатному ключу, образованного конкатенацией UID клиента и штрих-кода товара. Это связано
с тем, что один и тот же товар может принадлежать разным клиентам (наблюдал на практике).
Обязательными параметрами товаров являются: штрих-код, название, вес, объём, площадь основания. На основе физических параметров
формируется оплата за предосталение услуг хранения.
Доступ к описанию товаров требует авторизации - допустимо ли для конкретного пользователя изменение параметров SKU. 

## Сервис мини CRM
Сервис мини CRM, как следует из названия, обеспечивает хранение и доступ к контактной информации о клиентах.
Особо следует отметить, что данный сервис предоставляет доступ о состоянии клиента сервису заявок.
Состояние клиента определяет допустимо или нет принимать заявки от данного клиента. Приём заявок от конкретного клиента
может отклонён в силу ряда причин, например, финансовых.
Доступ к данным о клиенте для конкретного оператора определяется сервисом авторизации.

## Сервис логгирования
Предлагается не выделять отдельно сервис логгирования, а включить в каждый сервис, где это необходимо, в соответствии с шаблоном SideCar. 

## Сервис извещений
Сервис извещений это своего рода сервис посредник (сервис извещений) между сервисами приложения (сервисы-потребители), которым необходимо отправить
извещение получателю, как правило пользователю, и сервисами (сервисами-отправителями), которые физически выполняют отправку сообщений.
Сервис-отправитель выполняет только одну задачу: отправить извещение по определённому типу канала связи.
Т.е. определяется несколько типов сервисов-отправителей: сервис-отправитель СМС, сервис-отправитель e-mail, сервис-отправитель push
уведомлений. Каждый сервис-отправитель определяется уникальным кодом (строка).
Сервис потребитель передаёт сервису извещений структуру данных, в которой указывается тип извещения (уникальный код сервиса-отправителя)
и параметры извещения, применимые к данному типу извещения.
Сервис извещений определяет наличие и конечные точки подключения сервисов-отправителей статически, из файла конфигурации.
В файле конфигурации указывается код сервиса-отправителя и соответствующие параметры подключения. Это позволит жёстко контролировать
подключение необходимых сервисов-отправителей. Но у данного способа организации взаимодействия есть недостаток - необходимость ручного
конфигурирования.
Вполне возможно организовать автоматическую регистрацию сервисов-отправителей у сервиса извещений, например с использованием режима
саморегистрации.
Что касается масштабирование, то вполне возможно организовать пулы для однотипных сервисов-отправителей. А выбор конкретного сервиса-отправителя
сервисом извещений можно организовать в режиме последовательного перебора.
Взаимодействие сервисов-потребителей с сервисом извещений следует организовать с использованием боркера сообщений в режиме
не менее одного сообщения.

## Сервис аутентификации
Сервис аутентификации реализован на основе JWT

## Сервис авторизации
Сервис авторизации определяет доступ оператора к следующим бизнес-сущностям:
* клиент. Доступ к данным о клиенте;
* заявка. Доступ к заявке наследуется из праил доступа к данным клиента, которому принадлежит заявка.
Но особых случаях доступ к заявки может ограничен индивидуально;
* элемент хранилища. Оператор имеет доступ только к указанным складам, но как минимум к своему складу
Дополнительно сервис авторизации регламентирует доступ к бизнес-операциям, чтодолжно быть в интерфейсе пользователя.
При формировании пользовательского интерфейса, приложение осуществляет запрос к сервису авторизации.
