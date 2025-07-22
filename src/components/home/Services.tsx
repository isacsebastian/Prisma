import React from "react";

type Service = {
  title: string;
  description: string;
};

const services: Service[] = [
  {
    title: "Dynamic & Responsive Websites",
    description:
      "Having an attractive and easy-to-use website is essential. We help you create a personalized website that reflects the essence of your brand.",
  },
  {
    title: "Unique Visual Identities",
    description:
      "Your brand is the essence of your business. Do you want your brand to be remembered? We help you create a unique identity with personality!",
  },
  {
    title: "Reimagined Digital Boundaries",
    description:
      "Are you ready to take your business to the next level? We help you integrate new technologies and digital strategies to improve your online presence.",
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="servicios">
      {/* SVG Title */}
      <svg width="1189" height="176" viewBox="0 0 1189 176" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M72.4744 175.6C28.0744 175.6 -0.00562441 152.32 2.87438 115.84H37.6744C36.4744 135.52 49.6744 147.04 73.1944 147.04C93.5944 147.04 105.834 138.16 105.834 125.2C105.834 87.76 5.03438 119.68 5.03438 53.68C5.03438 20.32 30.9544 0.399992 71.0344 0.399992C114.714 0.399992 141.114 24.16 136.794 59.92H101.994C104.874 40.24 92.6344 28.96 70.3144 28.96C51.8344 28.96 40.0744 37.12 40.0744 49.84C40.0744 87.28 141.114 56.32 141.114 121.36C141.114 155.2 114.234 175.6 72.4744 175.6ZM204.628 143.68H291.508V172H170.068V3.99999H289.108V32.32H204.628V69.28H276.628V97.6H204.628V143.68ZM431.188 98.32C453.268 109.36 462.388 134.8 464.548 172H429.748C427.348 127.84 418.948 107.92 393.748 107.92H354.628V172H320.068V3.99999H400.468C438.628 3.99999 460.708 22.96 460.708 54.16C460.708 75.52 449.908 90.88 431.188 98.32ZM354.628 81.28H399.988C416.308 81.28 424.948 72.64 424.948 56.56C424.948 40.72 416.308 32.32 399.988 32.32H354.628V81.28ZM599.933 3.99999H635.933L573.773 172H535.853L472.493 3.99999H509.453L554.813 134.32L599.933 3.99999ZM655.928 172V3.99999H690.488V172H655.928ZM805.423 175.6C751.903 175.6 719.023 136.72 719.023 87.76C719.023 36.88 754.063 0.399992 804.463 0.399992C852.223 0.399992 885.583 32.56 878.383 75.04H842.623C847.423 47.44 830.623 29.68 804.943 29.68C774.223 29.68 754.783 55.36 754.783 87.76C754.783 121.6 775.423 146.32 805.423 146.32C829.423 146.32 845.503 130.48 849.103 109.6H885.823C880.063 149.92 848.863 175.6 805.423 175.6ZM945.253 143.68H1032.13V172H910.693V3.99999H1029.73V32.32H945.253V69.28H1017.25V97.6H945.253V143.68ZM1120.13 175.6C1075.73 175.6 1047.65 152.32 1050.53 115.84H1085.33C1084.13 135.52 1097.33 147.04 1120.85 147.04C1141.25 147.04 1153.49 138.16 1153.49 125.2C1153.49 87.76 1052.69 119.68 1052.69 53.68C1052.69 20.32 1078.61 0.399992 1118.69 0.399992C1162.37 0.399992 1188.77 24.16 1184.45 59.92H1149.65C1152.53 40.24 1140.29 28.96 1117.97 28.96C1099.49 28.96 1087.73 37.12 1087.73 49.84C1087.73 87.28 1188.77 56.32 1188.77 121.36C1188.77 155.2 1161.89 175.6 1120.13 175.6Z" fill="#EE3F00" />
      </svg>
      {/* Tarjetas de servicios */}
      {services.map((service) => (
        <div key={service.title} className="item_servicios">
          <span className="titulo_tarjetas_servicios">{service.title}</span>
          <span className="descripcion_tarjetas_servicios">{service.description}</span>
        </div>
      ))}
    </section>
  );
};

export default Services;
