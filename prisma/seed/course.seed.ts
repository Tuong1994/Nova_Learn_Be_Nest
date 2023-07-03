import { Course } from '@prisma/client';

const course: Course[] = [
  {
    id: 'C_0001',
    nameEng: 'Front End programming',
    nameVn: 'Lập trình Front End',
    descriptVn:
      'Đừng để cho những giấc mơ, đam mê, mong muốn xây dựng sự nghiệp cho chính cuộc đời của mình lại nằm trong tay của người khác qua những câu hỏi người này nhóm nọ là CÓ NÊN HỌC LẬP TRÌNH ? Lập trình là xu thế tất yếu, bạn hãy bắt tay vào ngay, bạn có thể chuyển ngành, gia tăng thu nhập nhờ freelancer hoặc ít nhất sẽ là skill rất cần cho công việc của bạn ở tương lai gần. Mới học lập trình bạn sẽ rất lan man, thiếu định hướng và đôi khi nản do mình không được hỗ trợ kịp thời. Thời gian và tuổi trẻ của bạn rất đáng giá, bạn cần một lộ trình bài bản thực tế để bạn nhanh chóng thay đổi sự nghiệp. Nova Learn thấu hiểu điều này và đã có hơn 9500+ bạn đăng kí học và có việc làm thông qua chương trình đào tạo Bootcamp Lập trình Front-End chuyên nghiệp từ Zero tại Nova Learn. Khóa học 100% thực hành cường độ cao theo dự án thực tế và kết nối doanh nghiệp hỗ trợ tìm việc ngay trọn đời sau khi học. Nova Learn sẽ đồng hành cùng bạn cho đến khi bạn có việc làm ổn định từ 8-16tr/tháng. Phương pháp đào tạo nghề chuẩn đại học Arizona - ASU Mỹ - tập trung tư duy, phân tích bài toán giúp cho học viên dễ dàng phát triển từ dev lên senior, leader và làm việc tại bất kì môi trường nào.',
    descriptEng:
      "Don't let your dreams, passions, and desires build a career for you My own life is in the hands of others through the words ask this person or that group, SHOULD I LEARN PROGRAMMING? Programming is the trend. Of course, you should start immediately, you can change industries, increase income from freelancer or at least a very necessary skill for the job yours in the near future. New to learning programming, you will be very rambling, lacking orientation and sometimes frustrated because they do not receive timely support. Time Your time and youth are very valuable, you need a methodical route reality for you to quickly change your career. Nova Learn understands this and there have been more than 9500+ you registered to study and get a job through Professional Front-End Programming Bootcamp training program from Zero at Nova Learn. 100% hands-on, project-based course reality and business connection support to find a job right after life learn. Nova Learn will accompany you until you have a good job determined from 8-16 million/month. The standard vocational training method of the University of Arizona - American ASU - focus on thinking, analyzing problems to help students easily grow from dev to senior, leader and work in any environment which school.",
    fee: 18800000,
    projectInfoEng:
      'End-of-course projects are built to enhance split-layout thinking, UI/UX flow design capabilities, layout slicing and responsiveness with popular UI libraries, SCSS proficiency, and simple word animation creation to complicated',
    projectInfoVn:
      'Các dự án cuối khóa được dựng lên để nâng cao tư duy phân chia layout, khả năng thiết kế flow UI/UX, cách giàn cắt layout và Responsive với các thư viện UI nổi tiếng, thành thạo SCSS, và tạo animation từ đơn giản tới phức tạp',
    categoryId: 'CG_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default course;
