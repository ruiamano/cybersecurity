(function ($) {
  'use strict';
 
  //合計出題問題数
  let $questionTotalNum = 5;
 
  // セキュリティクイズの問題文と選択肢（answer01が正答)------------------------------------------------------------------
  const prefecturalCapital = [
    {
      id: "01",
      question: "パスワードとしてよいものはどれでしょう？",
      answer01: "無関係な英数字、記号の組み合わせ",
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
      question: "メールで身に覚えのない請求があったらどうすればいいでしょうか？",
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
      question: "この中で最も信頼できる情報源はどれでしょうか？",
      answer01: "書籍",
      answer02: "ブログ",
      answer03: "SNS",
      answer04: "動画投稿サイト",
    },
    {
      id: "06",
      question: "令和3年度のサイバー犯罪の検挙件数（全国）として最も近いものはどれでしょうか？",
      answer01: "10,000件",
      answer02: "8,000件",
      answer03: "3,000件",
      answer04: "1,000件",
    },
    {
      id: "07",
      question: "IPA(情報処理推進機構)が発表した、2022年に個人に対して最も影響のあったセキュリティの事案はどれでしょうか？",
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
      question: "2021年の組織小中学生（石川県内）のフィルタリング設定率として最も近いものはどれでしょうか？",
      answer01: "約70%",
      answer02: "約90%",
      answer03: "約60%",
      answer04: "約95%",
    },
    {
      id: "10",
      question: "知らないメールアドレスからメールが届いたらどのように対応したら良いでしょうか？",
      answer01: "無視する",
      answer02: "添付されたファイルを開く",
      answer03: "記載されているURLをクリックする",
      answer04: "返信する",
    },
    {
      id: "11",
      question: "友達の悪口が書いてあるSNSを見つけました。どのように対応したら良いでしょうか？",
      answer01: "大人に注意してもらう",
      answer02: "おもしろいから、自分が知っている悪口を書く",
      answer03: "無視する",
      answer04: "書かれている情報を他の友達に教える",
    },
    {
      id: "12",
      question: "友達が悪ふざけをしている動画をSNSに投稿した。どのような悪影響があるでしょうか？",
      answer01: "炎上する",
      answer02: "人気者になる",
      answer03: "みんなに楽しんでもらえる",
      answer04: "特定の人しか見ないから、特に悪影響はない",
    },
    {
      id: "13",
      question: "ネット上で知り合ったから「二人で会って遊ぼう」と言われた。どのようにするべきでしょうか？",
      answer01: "親に相談する",
      answer02: "親に帰る時間を伝えて行く",
      answer03: "一人は怖いから、友達と行く",
      answer04: "せっかくだから一人で行く",
    },
    {
      id: "14",
      question: "スマホを使って、疲れてきた。どのようにするべきでしょうか？",
      answer01: "こまめに休憩を取るようにする",
      answer02: "我慢して使い続ける",
      answer03: "目に優しい食べ物を食べながら使い続ける",
      answer04: "ブルーライトのメガネをつける",
    },
    {
      id: "15",
      question: "有名人がマンションに入っていくのを見かけた。どのようにするのがいいでしょうか？",
      answer01: "特になにもしない",
      answer02: "SNSにマンションの場所を投稿する",
      answer03: "友達に教えてあげる",
      answer04: "入っていく写真を撮り、SNSに投稿する",
    },
    {
      id: "16",
      question: "「宝くじ当選」というタイトルのメールがきた。どのようにするべきでしょうか？",
      answer01: "無視する",
      answer02: "気になるので、メールを開いてみる",
      answer03: "ありがとうと返信してみる",
      answer04: "個人情報を送る",
    },
    {
      id: "17",
      question: "知らないアドレスからアンケートのお願いメールが来た。どのようにするのが良いでしょうか？",
      answer01: "知らないメールだから、回答しない",
      answer02: "お礼が良かったらする",
      answer03: "電話番号や名前までは入力する",
      answer04: "返信してみる",
    },
    {
      id: "18",
      question: "友達とオンラインゲームをしていたが、寝る時間になった。この後どのような行動を取るべきでしょうか？",
      answer01: "健康に悪いから、寝る",
      answer02: "楽しいから寝ないで続ける",
      answer03: "きりの良いところまで続ける",
      answer04: "明日まとめて寝れば良いから、続ける",
    },
    {
      id: "19",
      question: "夏休みに課題として絵を描く課題が出た。この時の行動として適切なものはどれでしょうか？",
      answer01: "自分で考えて書く",
      answer02: "友達の作品を真似する",
      answer03: "ネットで検索したアニメのキャラクターを写す",
      answer04: "やらない",
    },
    {
      id: "20",
      question: "スマホの使い方として正しいものはどれでしょうか？",
      answer01: "電車では、音が出ないように使う",
      answer02: "少しの間なら、電車の中でも電話してもいい",
      answer03: "充電が少ない時は、自動販売機のコンセントを借りてもいい",
      answer04: "急ぎの連絡だから、自転車を漕ぎながら、携帯を使う",
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
  let quizId = ["01", "02", "03", "04", "05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"];
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