import agreement from 'assets/img/icons/agreement.svg';
import career from 'assets/img/icons/career.svg';
import course from 'assets/img/icons/course.svg';
import departament from 'assets/img/icons/departament.svg';
import docQuestions from 'assets/img/icons/docQuestions.svg';
import partnerProgramm from 'assets/img/icons/partnerProgramm.svg';
import questionsWorkThree from 'assets/img/icons/questionsWorkThree.svg';
import examQuestions from 'assets/img/icons/examQuestions.svg';
import trainingPart from 'assets/img/icons/trainingPart.svg';

const cards = [
  {
    id: 0,
    title: 'Оплата/покупка курса',
    icon: course,
    list: [
      {
        id: 0,
        title: 'согласование стоимости'
      },
      {
        id: 1,
        title: 'выбор способа оплаты и помощь в процессе оплаты'
      },
      {
        id: 2,
        title: 'политика возврата средств'
      },
      {
        id: 3,
        title: 'подтверждение оплаты'
      }
    ]
  },

  {
    id: 1,
    title: 'Отдел тьюторов',
    icon: departament,
    list: [
      {
        id: 0,
        title: 'уточнить информацию по пройденному материалу'
      },
      {
        id: 1,
        title: 'сообщить о замеченной ошибке в учебном материале'
      },
      {
        id: 2,
        title: 'уточнить сроки сдачи домашнего задания и/или открытия урока'
      }
    ]
  },

  {
    id: 2,
    title: 'Оплата/покупка курса',
    icon: agreement,
    text: 'Если у вас возникли вопросы или вам нужна помощь в оформлении документов для налогового вычета, напишите в этот раздел и вам окажут необходимую поддержку и консультацию.'
  },

  {
    id: 3,
    title: 'Вопросы по документам',
    icon: docQuestions,
    list: [
      {
        id: 0,
        title: 'информация по загрузке и заполнению документов'
      },
      {
        id: 1,
        title:
          'помощь в заполнении документов для получения диплома/удостоверения'
      },
      {
        id: 2,
        title:
          'сроки отправки дипломов и информация по трек-номеру для отслеживания диплома '
      },
      {
        id: 3,
        title: 'изменение адреса для экспресс-доставки СДЕК'
      }
    ]
  },

  {
    id: 4,
    title: 'Партнерская программа',
    icon: partnerProgramm,
    list: [
      {
        id: 0,
        title: 'что такое партнерская программа?'
      },
      {
        id: 1,
        title: 'как зарегистрироваться в партнерской программе?'
      },
      {
        id: 2,
        title: 'поддержка по вопросам касающихся партнерской программы.'
      }
    ]
  },
  {
    id: 5,
    title: 'Вопросы по работе в тройках',
    icon: questionsWorkThree,
    list: [
      {
        id: 0,
        title: 'запись и отмена записи на работы в тройках'
      },
      {
        id: 1,
        title: 'узнать как проходит отработка психологических техник в тройках'
      },
      {
        id: 2,
        title: 'оставить обратную связь по пройденной отработке'
      }
    ]
  },

  {
    id: 6,
    title: 'Вопросы по экзамену',
    icon: examQuestions,
    list: [
      {
        id: 0,
        title: 'формат сдачи экзамена по вашему направлению'
      },
      {
        id: 1,
        title: 'даты экзамена по вашему направлению'
      },
      {
        id: 2,
        title: 'критерий оформления экзаменационных работ'
      },

      {
        id: 3,
        title: 'запись на экзамен'
      }
    ]
  },
  {
    id: 7,
    title: 'Центр Карьеры',
    icon: career,
    list: [
      {
        id: 0,
        title: 'согласование стоимости'
      },
      {
        id: 1,
        title: 'выбор способа оплаты и помощь в процессе оплаты'
      },
      {
        id: 2,
        title: 'политика возврата средств'
      },
      {
        id: 3,
        title: 'подтверждение оплаты'
      }
    ]
  },
  {
    id: 8,
    title: 'Учебная часть. Перевод и заморозка обучения',
    icon: trainingPart,
    text: 'Если вы хотите взять академический отпуск или перевестись в другую группу вы можете связаться с нашими специалистами'
  }
];
export default cards;
