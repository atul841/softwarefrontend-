const navConfig = [
  {
    label: "",
    items: [
      { title: "Dashboard", icon: "📊" , path: "/dashboard"
        
       },
    ],
  },


  {
    label: "",
    items: [
      {
        title: "My Profile",
        icon: "👤",
        children: [
          { title: "Profile", path: "/myprofile/profile" },
          { title: "KYC Details", path: "/myprofile/kyc-details" },
        ],
      },
      {
        title: "Members",
        icon: "👥",
        children: [
          { title: "My Subordinate", path: "/members/subordinate" },
          { title: "Level Members", path: "/members/level" },
        ],
      },
      {
        title: "Subscription",
        icon: "💳",
        children: [
          { title: "Purchase", path: "/subscription/purchase" },
          { title: "Report", path: "/subscription/report" },
        ],
      },
      {
        title: "Lean & Earn",
        icon: "📚",
         children : [
          {title : "Learn and Earn", path: "learn/learn-earn"}
         ],
      },
      {
        title: "Income Report",
        icon: "💰",
        children: [
          { title: "Referral Income", path: "/income/referral" },
          { title: "Learn & Earn Income", path: "/income/learn-earn" },
        ],
      },
      {
        title: "Withdrawal",
        icon: "🏧",
        children :[
          {title : "Withdrawal",path: "/withdrawal/withdrawal",},
          {title : "Report" , path : "/withdrwal/report"},

        ],
      },
      {
        title: "Fund Management",
        icon: "🏦",
        children :[
          {title : "Deposit" , path : "/fund/deposit"},
          {title : "Deposit History" , path :"/fund/depositehistory"},
          {title : "Deposit Wallet History", path :"/fund/depositwallethsitroy"},
          {title : "Withdra Wallet History", path:"/fund/withdrawallethistory"},
          {title : "Referral Wallet Transfer", path : "/fund/ReferralWalletTransfer"} ,
          {title : "Referral Walle tHistory", path : "/fund/ReferralWalletHistory"} , 
          {title : "Learn Earn Wallet Transfer", path : "/fund/LearnEarnWalletTransfer"} , 
          {title : "LearnEarnWalletHistory", path : "/fund/LearnEarnWalletHistory"} ,

        ],
      },
      {
        title: "Settings",
        icon: "⚙️",
        children :[
          {title : "ChangePin", path : "/settings/ChangePin"} , 
          {title : "ChangePassword", path : "/settings/ChangePassword"} , 
          {title : "UserNotification", path : "/settings/UserNotification"}, 
          {title : "AdminNotification" , path : "/settings/AdminNotification"}  ,
        ] ,
      }, 
      {
        title: "Supports",
        icon: "🤖",
        children :[
          {title : "Support", path : "/supports/support"} , 
          {title : "Support Histroy", path : "/supports/supporthistroy"} , 
          
        ] ,
      }, 
      { 
        title : "Logout",
        icon : "⏻", path :'/logout/logout',
        
      },
      
    ],
  },
];
export default navConfig;
