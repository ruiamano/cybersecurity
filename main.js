(function ($) {
  'use strict';
 
  //合計出題問題数
  let $questionTotalNum = 5;
 
  // セキュリティクイズの問題文と選択肢（answer01が正答)------------------------------------------------------------------
  const prefecturalCapital = [
    {
      id: "01",
      question: "パスワードとしてよいものはどれでしょう？",
      answer01: "無関係な番号",
      answer02: "誕生日",
      answer03: "キーボードの並び順",
      answer04: "全て同じ番号",
    },
    {
      id: "02",
      question: "ネットに書き込んでいいものはどれでしょう？",
      answer01: "勉強で分からないことの質問",
      answer02: "噂話",
      answer03: "個人情報",
      answer04: "人の悪口",
    },
    {
      id: "03",
      question: "身に覚えのない請求があったらどうすればいいでしょうか？",
      answer01: "親に相談する",
      answer02: "お金を払う",
      answer03: "書かれている連絡先に問い合わせる",
      answer04: "放置する",
    },
    {
      id: "04",
      question: "安全性の低いURLはどれでしょうか？",
      answer01: "http://wwww.ooo.com/",
      answer02: "https://www.xxx.com",
      answer03: "https://www.yyycom",
      answer04: "https://www.ooo.com",
    },
    {
      id: "05",
      question: "最も信頼できる情報源はどれでしょうか？",
      answer01: "書籍",
      answer02: "ブログ",
      answer03: "SNS",
      answer04: "動画投稿サイト",
    },
    {
      id: "06",
      question: "令和2年度のサイバー犯罪の検挙件数として最も近いものはどれでしょうか？",
      answer01: "10,000件",
      answer02: "8,000件",
      answer03: "3,000件",
      answer04: "1,000件",
    },
    {
      id: "07",
      question: "2021年に個人に対して最も影響のあったセキュリティの事案はどれでしょうか？",
      answer01: "フィッシングによる個人情報等の搾取",
      answer02: "ネット上の誹謗・中傷・デマ",
      answer03: "スマホ決済の不正利用",
      answer04: "クレジットカード情報の不正利用",
    },
    {
      id: "08",
      question: "2021年に組織に対して最も影響のあったセキュリティの事案はどれでしょうか？",
      answer01: "ランサムウェアによる被害",
      answer02: "ビジネスメール詐欺による金銭被害",
      answer03: "不注意による情報漏洩",
      answer04: "修正前のプログラムを狙った攻撃",
    },
    {
      id: "09",
      question: "2021年に組織小中学生（石川県内）のフィルタリング設定率として最も近い数字はどれでしょうか？",
      answer01: "70%",
      answer02: "90%",
      answer03: "60%",
      answer04: "95%",
    },
    {
      id: "10",
      question: "知らないメールアドレスからメールが届いたらどのように対応したら良いでしょうか？",
      answer01: "無視する",
      answer02: "添付されたファイルを開く",
      answer03: "記載されているURLをクリックする",
      answer04: "返信する",
    },
  ];
//  -----------------------------------------------------------------------------------------------------------------

  //質問をランダムにする関数の定義------------------------------------------------------------------------------------------
  function shuffleQuiz(array) {
    for (let i = (array.length - 1); 0 < i; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      let selected = array[i];
      array[i] = array[random];
      array[random] = selected;
    }
    return array;
  }
  // ------------------------------------------------------------------------------------------------------------------

  //問題のID一覧の配列 問題を追加したらIDを増やす
  let quizId = ["01", "02", "03", "04", "05","06","07","08","09","10"];
  shuffleQuiz(quizId); //問題の順番をバラバラにする
 
  //現在の質問数
  let $currentNum = 0;
 
  //1問正解で貰える得点の設定
  let $pointPerCorrect = 20;
 
  let questionObject = (function () {
    let Obj = function ($target) {
 
      //質問の番号
      this.$questionNumber = $target.find('.quiz-question-number');
 
      //質問文
      this.$questionName = $target.find('.quiz-question');
 
      //選択肢ボタン
      this.$questionButton = $target.find('.quiz-button');
      this.$button01 = $target.find('.button01');
      this.$button02 = $target.find('.button02');
      this.$button03 = $target.find('.button03');
      this.$button04 = $target.find('.button04');
 
      //選択肢のテキスト
      this.$answer01 = $target.find('.quiz-text01');
      this.$answer02 = $target.find('.quiz-text02');
      this.$answer03 = $target.find('.quiz-text03');
      this.$answer04 = $target.find('.quiz-text04');
      
 
      //score
      this.$score = $target.find('.score-wrap .score');
 
      this.init();
    };
    Obj.prototype = {
      //初回設定
      init: function () {
        //イベント登録
        this.event();
      },
      event: function () {
        let _this = this;
        let score = 0;
 
        //ウインドウ読み込み時
        $(window).on('load', function () {
          //value取得
          let value = quizId[$currentNum]; //最初は0（1番目）
          //次の質問を取得
          let nextQuestion = _this.searchQuestion(value);
          //次の質問に切り替える
          _this.changeQuestion(nextQuestion);
          //回答のシャッフル
          _this.shuffleAnswer($('.quiz-answer'));
        });
 
        //button クリック
        this.$questionButton.on("click", function () {
 
          if ($(this).hasClass('button01')) {
            $(this).parents('.quiz-answer').addClass('is-correct');
            
            score = score + $pointPerCorrect;
          } else {
            $(this).parents('.quiz-answer').addClass('is-incorrect');
          }
 
          $(this).addClass('is-checked');
 
          if ($currentNum + 1 == $questionTotalNum) {
            setTimeout(function () {
              $('.finish').addClass('is-show');
              $('.score-wrap .score').text(score);
            }, 1000);
          } else {
            setTimeout(function () {
              //現在の数字の更新
              $currentNum = $currentNum + 1;
 
              //次の質問番号を取得
              let value = quizId[$currentNum];
 
              //次の質問を取得
              let nextQuestion = _this.searchQuestion(value);
 
              //次の質問に切り替える
              _this.changeQuestion(nextQuestion);
 
              //クラスを取る
              _this.$questionButton.removeClass('is-checked');
              $('.quiz-answer').removeClass('is-correct').removeClass('is-incorrect');
 
              //回答のシャッフル
              _this.shuffleAnswer($('.quiz-answer'));
 
            }, 1000);
          }
          return false;
        });
      },
      searchQuestion: function (questionId) {
        let nextQuestion = null;
        prefecturalCapital.forEach(function (item) {
          if (item.id == questionId) {
            nextQuestion = item;
          }
        });
        return nextQuestion;
      },
      changeQuestion: function (nextQuestion) {
        let _this = this;
 
        //質問文の入れ替え
        _this.$questionName.text(nextQuestion.question);
 
        //質問番号を1つ増やす
        let numPlusOne = $currentNum + 1;
        _this.$questionNumber.text('質問' + numPlusOne);
 
        //選択肢のテキストの入れ替え
        _this.$answer01.text(nextQuestion.answer01);
        _this.$answer02.text(nextQuestion.answer02);
        _this.$answer03.text(nextQuestion.answer03);
        _this.$answer04.text(nextQuestion.answer04);
      },
      shuffleAnswer: function (container) {
        let content = container.find("> *");
        let total = content.length;
        content.each(function () {
          content.eq(Math.floor(Math.random() * total)).prependTo(container);
        });
      },
    };
    return Obj;
  })();
 
  let quiz = $('.quiz');
  if (quiz[0]) {
    let queInstance = new questionObject(quiz);
  }
 
})(jQuery);