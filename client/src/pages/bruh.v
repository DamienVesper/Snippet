module Question8(input CLK, output A, output B, output C);
    TFF(.T1(1), .CLK(CLK), .Q(A));
    TFF(.T1(1), .CLK(A), .Q(B));
    TFF(.T1(1), .CLK(B), .Q(C));
endmodule
