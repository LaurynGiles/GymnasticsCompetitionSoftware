import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import RadioSelectIcon from "../components/RadioSelectIcon";

const SettingsJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px] relative">
        <div className="inline-flex flex-col items-center gap-[30px] absolute top-0 left-0">
          <NavigationBarDefault />
          <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
            <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
              User information
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-end gap-[15px] px-[10px] py-[20px] absolute top-[133px] left-[25px] bg-notification-box">
          <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
            <div className="relative w-[132px] h-[24px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
              GSA number:
            </div>
            <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
              <div className="relative w-[161px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal]">
                654658
              </div>
            </div>
          </div>
          <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
            <div className="relative w-[132px] h-[24px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
              Name:
            </div>
            <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
              <div className="relative w-[161px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal]">
                Debbie Giles
              </div>
            </div>
          </div>
          <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
            <div className="relative w-[132px] h-[24px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
              Email:
            </div>
            <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
              <div className="relative w-[161px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal]">
                debbie@gmail.com
              </div>
            </div>
          </div>
          <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
            <div className="relative w-[132px] h-[24px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
              License:
            </div>
            <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
              <div className="relative w-[161px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal]">
                Category E
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 absolute top-[400px] left-0">
          <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
            Layout settings
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-[54px] absolute top-[457px] left-[35px]">
          <div className="inline-flex flex-col items-start gap-[25px] relative flex-[0_0_auto]">
            <div className="flex w-[210px] gap-[9px] px-[11px] py-[8px] bg-anti-flash-white rounded-[20px] overflow-hidden flex-col items-center relative flex-[0_0_auto]">
              <div className="relative w-[118px] h-[27px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[22px] text-center tracking-[0] leading-[normal]">
                Horizontal
              </div>
              <div className="inline-flex flex-col items-start gap-[9px] relative flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px]">
                <div className="flex w-[190px] items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]">
                  <RadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="relative w-[85px] h-[27px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Top
                  </div>
                </div>
                <div className="flex w-[190px] items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]">
                  <RadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="relative w-[85px] h-[27px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Bottom
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[210px] gap-[9px] px-[11px] py-[8px] bg-anti-flash-white rounded-[20px] overflow-hidden flex-col items-center relative flex-[0_0_auto]">
              <div className="relative w-[118px] h-[27px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[22px] text-center tracking-[0] leading-[normal]">
                Vertical
              </div>
              <div className="flex flex-col w-[190px] items-start gap-[9px] relative flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px]">
                <div className="flex w-[190px] items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]">
                  <RadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="relative w-[145px] h-[27px] mt-[-1.00px] mr-[-3.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Left-handed
                  </div>
                </div>
                <div className="flex w-[190px] items-center gap-[14px] px-[5px] py-0 relative flex-[0_0_auto]">
                  <RadioSelectIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="relative w-[145px] h-[27px] mt-[-1.00px] mr-[-3.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Right-handed
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start gap-[86px] relative flex-[0_0_auto]">
            <div className="inline-flex justify-center gap-[10px] flex-col items-center relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                </div>
                <div className="inline-flex items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                  <div className="w-[15px] h-[15px] relative bg-glaucous" />
                </div>
              </div>
              <div className="w-[40px] h-[21px] relative bg-glaucous" />
            </div>
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                <div className="w-[15px] h-[15px] relative bg-glaucous" />
                <div className="w-[15px] h-[15px] relative bg-glaucous" />
                <div className="w-[15px] h-[15px] relative bg-glaucous" />
                <div className="w-[15px] h-[15px] relative bg-glaucous" />
              </div>
              <div className="w-[40px] h-[21px] relative bg-glaucous" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsJudges